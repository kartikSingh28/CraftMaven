// routes/buyer.js
const { Router } = require("express");
const { buyerModel, productModel, purchaseModel } = require("../db");
const { cartModel } = require("../models/cart");
const jwt = require("jsonwebtoken");
const { JWT_BUYER_PASSWORD } = require("../config");
const { buyerMiddleware } = require("../middlewares/buyermiddleware");
const bcrypt = require("bcrypt");
const zod = require("zod");

const BuyerRouter = Router();

const signupSchema = zod.object({
  email: zod.string().email().min(5),
  password: zod.string().min(5),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  address: zod.string().min(5).optional(),
});

BuyerRouter.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Incorrect data format", error: parsed.error });
  }

  const { email, password, firstName, lastName, address } = parsed.data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await buyerModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
    });
    return res.status(201).json({ message: "You are registered successfully" });
  } catch (err) {
    console.error("Buyer signup error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const signinSchema = zod.object({
  email: zod.string().email().min(5),
  password: zod.string().min(5),
});

BuyerRouter.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data format", error: parsed.error });
  }

  const { email, password } = parsed.data;
  try {
    const user = await buyerModel.findOne({ email });
    if (!user) return res.status(403).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id, role: "buyer" }, JWT_BUYER_PASSWORD, { expiresIn: "1h" });
    return res.json({ message: "Signin successful", token });
  } catch (err) {
    console.error("Buyer signin error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Purchase a product (protected)
BuyerRouter.post("/purchase", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    const product = await productModel.findById(productId);
    if (!product || !product.isActive) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalPrice = product.price * quantity;
    const purchase = await purchaseModel.create({
      buyerId: userId,
      productId,
      quantity,
      totalPrice,
      status: "pending",
    });

    await buyerModel.findByIdAndUpdate(userId, { $push: { purchases: purchase._id } });
    product.stock -= quantity;
    await product.save();

    return res.status(201).json({ message: "Purchase successful", purchase });
  } catch (err) {
    console.error("Purchase error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Get buyer order history
BuyerRouter.get("/purchases", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const purchases = await purchaseModel
      .find({ buyerId: userId })
      .populate("productId", "name price category image")
      .sort({ purchaseDate: -1 })
      .lean();

    return res.json({ message: "Order history fetched successfully", purchases });
  } catch (err) {
    console.error("Get purchases error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Buyer profile
BuyerRouter.get("/profile", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await buyerModel.findById(userId).select("-password").lean();
    return res.json({ message: "Your profile", user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Cart: add item
BuyerRouter.post("/cart/add", buyerMiddleware, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const buyerId = req.userId;
    if (!productId) return res.status(400).json({ message: "product ID is required" });

    const existing = await cartModel.findOne({ buyerId, productId });
    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.json({ message: "Cart updated", item: existing });
    }

    const newItem = await cartModel.create({ buyerId, productId, quantity });
    return res.status(201).json({ message: "Item added to the cart", item: newItem });
  } catch (err) {
    console.error("Cart add error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Get current cart
BuyerRouter.get("/cart", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    const items = await cartModel.find({ buyerId }).populate("productId", "name price image").lean();
    return res.json({ message: "Cart fetched", cart: items });
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Remove from cart
BuyerRouter.delete("/cart/:productId", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    const { productId } = req.params;
    await cartModel.findOneAndDelete({ buyerId, productId });
    return res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Cart delete error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { BuyerRouter };
