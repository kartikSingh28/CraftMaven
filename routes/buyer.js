
const { Router }=require("express");
const {buyerModel,adminModel,productModel,purchaseModel}=require("../db");

const jwt=require("jsonwebtoken");

const {JWT_BUYER_PASSWORD }=require("../config");
const { buyerMiddleware }=require("../middlewares/buyermiddleware");
const bcrypt=require("bcrypt");
const zod=require("zod");


const BuyerRouter=Router();

BuyerRouter.post("/signup",async (req,res)=>{
    const requireBody=zod.object({
        email:zod.string().email().min(5),
        password:zod.string().min(5),
        firstName:zod.string().min(3),
        lastName:zod.string().min(3),
        address:zod.string().min(5).optional(),
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message:"Incorrect data format",
            error:parseDataWithSuccess.error,
        });
    }

       const { email, password, firstName, lastName, address } = parseDataWithSuccess.data;

        const hashedPassword=await bcrypt.hash(password,10);

        try{
            await buyerModel.create({
                email,
                password:hashedPassword,
                firstName,
                lastName,
                address
            });

            return res.json({
                message:"You are registered SuccessFully"
            })
        }catch(err){
            console.log(err);
            if(err.code===11000){
                res.status(400).json({
                    message:"User Already exists"
                })
            }else{
                res.status(500).json({
                    message:"Something went wrong"
                })
            }
        }
    
});

BuyerRouter.post("/signin", async (req, res) => {
  const requireBody = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
  });

  const parseDataWithSuccess = requireBody.safeParse(req.body);

  if (!parseDataWithSuccess.success) {
    return res.status(400).json({
      message: "Invalid data format",
      error: parseDataWithSuccess.error,
    });
  }

  const { email, password } = parseDataWithSuccess.data;

  try {
    const user = await buyerModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, role: "buyer" },
      JWT_BUYER_PASSWORD,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});



BuyerRouter.post("/purchase", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const product = await productModel.findById(productId);
    if (!product || !product.isActive) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (product.stock < (quantity || 1)) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalPrice = product.price * (quantity || 1);

    const purchase = await purchaseModel.create({
      buyerId: userId,
      productId,
      quantity: quantity || 1,
      totalPrice,
      status: "pending",
    });

    await buyerModel.findByIdAndUpdate(userId, {
      $push: { purchases: purchase._id },
    });

    product.stock -= (quantity || 1);
    await product.save();

    res.json({
      message: "Purchase successful",
      purchase,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


module.exports={BuyerRouter}