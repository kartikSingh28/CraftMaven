require('dotenv').config()
const express=require("express");
const app=express();
const cors = require("cors");
const mongoose=require("mongoose");
const { BuyerRouter }=require("./routes/buyer");
const { sellerRouter }=require("./routes/seller");
const { adminRouter }=require("./routes/admin");

app.use(express.json());

//cors

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/v1/buyer",BuyerRouter);
app.use("/api/v1/seller",sellerRouter);
app.use("/api/v1/admin",adminRouter);

async function main(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        app.listen(3000,()=>{
            console.log("server started at port 3000")
        });
    }catch(err){
        console.log("Error connecting to MOngoDB",err.message);
    }
}

main();