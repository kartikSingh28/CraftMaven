
const { Router }=require("express");
const jwt=require("jsonwebtoken");

const {JWT_SELLER_PASSWORD}=require("../config.js");
const bcrypt=require("bycrypt");
const zod=require("zod");

const sellerRouter=Router();

sellerRouter.post("/signup",async (req,res)=>{
    const requireBody=zod.object({
        email:zod.string().email().min(10),
        password:zod.string().min(5),
        firstName:zod.string().min(3),
        lastName:zod.string().min(3)
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.json({
            message:"Incorrect Data format",
            error:parseDataWithSuccess.error,
        });
    }

    const {email,password,firstName,lastname}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    res.json({
        message:"SignUp endpoint"
    })
});

sellerRouter.post("/signin",(req,res)=>{
    res.json({
        messgae:"SignIn EndPoint"
    })
});

sellerRouter.post("/sell",(req,res)=>{
    res.json({
        message:" Seller  EndPoint"
    })
});




module.exports={sellerRouter}