
const { Router }=require("express");


const BuyerRouter=Router();

BuyerRouter.post("/signup",(req,res)=>{
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