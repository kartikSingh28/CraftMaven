require('dotenv').config()
const express=require("express");
const app=express();
const cors = require("cors");
const mongoose=require("mongoose");
const { BuyerRouter }=require("./routes/buyer");
const { sellerRouter }=require("./routes/seller");
const { adminRouter }=require("./routes/admin");
const { productRouter } = require("./routes/product");
const PaymentRouter = require("./routes/payments");

app.use(express.json());
app.use((req, res, next) => { console.log(new Date().toISOString(), req.method, req.originalUrl); next(); });
//cors

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/v1/buyer",BuyerRouter);
app.use("/api/v1/seller",sellerRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/payment", PaymentRouter);
console.log("Mounted paymentRouter at /api/v1/payment");

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