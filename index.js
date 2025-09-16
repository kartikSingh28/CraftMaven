const express=require("express");

const app=express();

app.use(express.json());

app.use("/api/v1/buyer",buyerRouter);
app.use("/api/v1/seller",sellerRouter);
app.use("/api/v1/admin",adminRouter);



app.listen(3000,()=>{
    console.log("server started");
})