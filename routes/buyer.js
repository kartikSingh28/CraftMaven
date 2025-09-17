
const { Router }=require("express");
const {buyerModel,adminModel}=require("../db");

const jwt=require("jsonwebtoken");

const {JWT_BUYER_PASSWORD }=require("../config");
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



BuyerRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"Purchase EndPoint"
    })
});





module.exports={BuyerRouter}