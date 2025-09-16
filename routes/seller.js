const express=require("express");
const { Router }=require("express");


const sellerRouter=Router();

sellerRouter.post("/signup",(req,res)=>{
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