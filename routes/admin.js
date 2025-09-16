const express = require("express");
const { Router } = require("express");

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
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
