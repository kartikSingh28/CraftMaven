
const { Router }=require("express");

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
    });

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDatawithSuccess.success){
        return res.status(400).json({
            message:"Incorrect data format",
            error:parseDataWithSuccess.error,
        });
    }

        const {email,password,firstName,lastName}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
    res.json({
        message:"SignUp endpoint"
    })
});

BuyerRouter.post("/signin",(req,res)=>{
    res.json({
        messgae:"SignIn EndPoint"
    })
});

BuyerRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"Purchase EndPoint"
    })
});





module.exports={BuyerRouter}