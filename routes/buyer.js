// routes/buyer.js
const { Router } = require("express");
const mongoose = require("mongoose");
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
    const user = await buyerModel.findOne({ email }).select("+password");
    if (!user) return res.status(403).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).json({ message: "Incorrect password" });

    // build payload and sign token
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const payload = { id: user._id.toString(), name, email: user.email };
    const token = jwt.sign(payload, JWT_BUYER_PASSWORD, { expiresIn: "1h" });

    return res.json({
      message: "Signin successful",
      token,
      buyer: {
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email,
        _id: user._id
      }
    });
  } catch (err) {
    console.error("Buyer signin error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

BuyerRouter.get("/me", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await buyerModel.findById(userId).select("-password").lean();
    if (!user) return res.status(404).json({ message: "Buyer not found" });

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    return res.json({
      message: "Current buyer fetched",
      buyer: {
        _id: user._id,
        name,
        email: user.email,
        address: user.address || ""
      }
    });
  } catch (err) {
    console.error("Get /me error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
} );

// Purchase a product (protected)
BuyerRouter.post("/purchase", buyerMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

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


BuyerRouter.post("/cart/add", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    const { productId, quantity = 1 } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Valid productId is required" });
    }
    const qty = parseInt(quantity, 10) || 1;
    if (qty < 1) return res.status(400).json({ message: "Quantity must be >= 1" });

    // Optional: verify product exists
    if (productModel) {
      const prodExists = await productModel.findById(productId).select("_id isActive stock");
      if (!prodExists || !prodExists.isActive) {
        return res.status(404).json({ message: "Product not found" });
      }
      // Optional stock guard: if you want to prevent adding more than stock
      if (prodExists.stock < qty) {
        return res.status(400).json({ message: "Requested quantity exceeds available stock" });
      }
    }

    // Atomic increment if exists, otherwise create
    const updated = await cartModel.findOneAndUpdate(
      { buyerId, productId },
      { $inc: { quantity: qty } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    return res.status(200).json({ message: "Cart updated", item: updated });
  } catch (err) {
    console.error("Cart add error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Get current cart
BuyerRouter.get("/cart", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    // populate product fields needed by frontend (adjust select if you store seller differently)
    const items = await cartModel
      .find({ buyerId })
      .populate({
        path: "productId",
        select: "name price image sellerName seller isActive",
        populate: { path: "seller", select: "name" }, // if your Product references Seller
      })
      .lean();

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
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const removed = await cartModel.findOneAndDelete({ buyerId, productId });
    if (!removed) return res.status(404).json({ message: "Item not found in cart" });

    return res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Cart delete error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Decrement quantity (optional)
BuyerRouter.patch("/cart/:productId/decrement", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    const { productId } = req.params;
    const dec = parseInt(req.body.dec || 1, 10);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    if (dec < 1) return res.status(400).json({ message: "dec must be >= 1" });

    const item = await cartModel.findOne({ buyerId, productId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity -= dec;
    if (item.quantity <= 0) {
      await item.remove();
      return res.json({ message: "Item removed from cart" });
    }
    await item.save();
    return res.json({ message: "Quantity updated", item });
  } catch (err) {
    console.error("Cart decrement error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


// --------------------- PRODUCT ROUTES ADDED HERE ---------------------
// GET /api/v1/products  (list)
BuyerRouter.get("/products", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();
    const category = (req.query.category || "").trim();
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.max(1, parseInt(req.query.limit || "12", 10));

    const filter = { isActive: true };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const total = await productModel.countDocuments(filter);
    const pages = Math.max(1, Math.ceil(total / limit));
    const skip = (page - 1) * limit;

    const products = await productModel.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate({ path: "sellerId", select: "firstName lastName shopName" })
      .lean();

    const normalized = products.map((p) => {
      const seller = p.sellerId || {};
      const sellerName = (seller.shopName && seller.shopName.trim()) ||
                         ((seller.firstName || seller.lastName) ? `${(seller.firstName||"").trim()} ${(seller.lastName||"").trim()}`.trim() : "Unknown");
      return {
        ...p,
        sellerName,
        image: p.image || ""
      };
    });

    return res.json({
      products: normalized,
      total,
      page,
      pages
    });
  } catch (err) {
    console.error("GET /products error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// GET /api/v1/products/:id  (single product)
BuyerRouter.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const p = await productModel.findById(id)
      .populate({ path: "sellerId", select: "firstName lastName shopName" })
      .lean();

    if (!p) return res.status(404).json({ message: "Product not found" });

    const seller = p.sellerId || {};
    const sellerName = (seller.shopName && seller.shopName.trim()) ||
                       ((seller.firstName || seller.lastName) ? `${(seller.firstName||"").trim()} ${(seller.lastName||"").trim()}`.trim() : "Unknown");

    const product = {
      ...p,
      sellerName,
      image: p.image || ""
    };

    return res.json({ product });
  } catch (err) {
    console.error("GET /products/:id error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
// --------------------- END PRODUCT ROUTES ---------------------

module.exports = { BuyerRouter };
