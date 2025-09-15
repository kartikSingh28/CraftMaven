const express=require("express");

const app=express();

app.use(express.json());

app.post("/signup",(req,res)=>{

    res.json({
        message:"SignUp endPoint"
    })
});


app.post("/Signin",(req,res)=>{

    res.json({
        message:"SignIn endPoint"
    })
});

app.post("/buyer/purchase",(req,res)=>{

    res.json({
        message:"Purchase endPoint"
    })
})

app.listen(3000,()=>{
    console.log("server started");
})