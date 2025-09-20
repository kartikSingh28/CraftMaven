
const { Router } = require("express");

const jwt=require("jsonwebtoken");

const {JWT_ADMIN_PASSWORD}=require("../config");
const bcrypt=require("bcrypt");
const zod=require("zod");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const requireBody=zod.object({
        email:zod.string().email().min(5),
        password:zod.string().min(5),
        firstName:zod.string().min(3),
        lastName:zod.string().min(3),
    })

    const parseDataWithSuccess=requireBody.safeParse(req.body);

    if(!parseDataWithSuccess.success){
        return res.status(400).json({
            message:"incorrect Data format",
            error:parseDataWithSuccess.error
        })
    }

    const {email,password,firstName,lastName}=req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    res.json({ message: "Admin SignUp endpoint" });
});

adminRouter.post("/signin", (req, res) => {
    res.json({ message: "Admin SignIn endpoint" });
});


adminRouter.post("/products", (req, res) => {
    res.json({ message: "Add new product" });
});


adminRouter.delete("/products/:id", (req, res) => {
    res.json({ message: `Delete product with id ${req.params.id}` });
});

adminRouter.get("/products", (req, res) => {
    res.json({ message: "Get all products" });
});


adminRouter.get("/orders", (req, res) => {
    res.json({ message: "View all customer orders" });
});

adminRouter.put("/orders/:id", (req, res) => {
    res.json({ message: `Update order status for order ${req.params.id}` });
});

module.exports = { adminRouter };
