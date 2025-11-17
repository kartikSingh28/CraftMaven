// routes/seller.js
const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary.js");
const jwt = require("jsonwebtoken");
const { sellerModel, productModel } = require("../db.js");
const { sellerMiddleWare } = require("../middlewares/sellermiddleware.js");
const { JWT_SELLER_PASSWORD } = require("../config.js");
const bcrypt = require("bcrypt");
const zod = require("zod");
const fs = require("fs");
const util = require("util");
const path = require("path");

const sellerRouter = Router();

// ---- Safe logger (mask Authorization header) ----
sellerRouter.use((req, res, next) => {
  const auth = req.headers.authorization || "<none>";
  const masked = auth === "<none>" ? auth : `${auth.slice(0, 8)}...[masked]`;
  console.log(`[SELLER ROUTE] ${req.method} ${req.originalUrl} - Authorization:`, masked);
  next();
});


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (!file || !file.mimetype) return cb(new Error("Invalid file"));
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});


function streamUploadToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
}


const signupSchema = zod.object({
  email: zod.string().email().min(5),
  password: zod.string().min(5),
  firstName: zod.string().min(3),
  lastName: zod.string().min(3),
  address: zod.string().min(5).optional(),
  shopName: zod.string().min(3),
});

const signinSchema = zod.object({
  email: zod.string().email().min(5),
  password: zod.string().min(5),
});

const sellSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().optional(),
  price: zod.preprocess((v) => Number(v), zod.number().nonnegative()),
  stock: zod
    .preprocess((v) => (v === undefined || v === "" ? 0 : Number(v)), zod.number().int().nonnegative())
    .optional(),
  category: zod.string().optional(),
});

// ----- Routes -----


sellerRouter.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Incorrect data format", error: parsed.error });
  }
  const { email, password, firstName, lastName, address, shopName } = parsed.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = await sellerModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      shopName,
    });

    const token = jwt.sign({ id: newSeller._id, role: "seller" }, JWT_SELLER_PASSWORD, { expiresIn: "1h" });

    res.status(201).json({
      message: "Successfully registered as Seller",
      token,
      seller: { id: newSeller._id, email: newSeller.email, shopName: newSeller.shopName },
    });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) return res.status(400).json({ message: "Seller already exists" });
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * POST /signin
 */
sellerRouter.post("/signin", async (req, res) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data format", error: parsed.error });
  }
  const { email, password } = parsed.data;

  try {
    const seller = await sellerModel.findOne({ email });
    if (!seller) return res.status(403).json({ message: "Seller not found" });

    const valid = await bcrypt.compare(password, seller.password);
    if (!valid) return res.status(403).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: seller._id, role: "seller" }, JWT_SELLER_PASSWORD, { expiresIn: "1h" });

    res.json({ message: "Signin successful", token, seller: { id: seller._id, email: seller.email, shopName: seller.shopName } });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


sellerRouter.post("/sell", sellerMiddleWare, upload.single("image"), async (req, res) => {
  try {
    const sellerId = req.userId;
    if (!sellerId) return res.status(401).json({ message: "Not authenticated" });

    // Validate body using schema (note: req.body fields are strings from form-data)
    const parsed = sellSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid input", error: parsed.error });
    }
    const { name, description, price, stock = 0, category } = parsed.data;

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file && req.file.buffer) {
      try {
        const uploadResult = await streamUploadToCloudinary(req.file.buffer, {
          folder: "products",
          resource_type: "image",
        });
        imageUrl = uploadResult.secure_url || "";
        imagePublicId = uploadResult.public_id || "";
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const product = await productModel.create({
      name,
      description: description || "",
      price,
      stock,
      category: category || "general",
      sellerId,
      isActive: true,
      image: imageUrl,
      imagePublicId,
    });

    res.status(201).json({ message: "Product listed successfully", product });
  } catch (err) {
    console.error("POST /sell error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


sellerRouter.get("/products", sellerMiddleWare, async (req, res) => {
  try {
    const sellerId = req.userId;
    console.log("[GET /products] sellerId from middleware:", sellerId);
    if (!sellerId) return res.status(401).json({ message: "Not authenticated" });

    const products = await productModel.find({ sellerId }).sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    console.error("GET /seller/products error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


sellerRouter.get("/products/debug", async (req, res) => {
  try {
    const sid = req.query.sellerId;
    if (!sid) return res.status(400).json({ message: "Provide sellerId query param for debug" });

    console.log("[DEBUG GET /products/debug] sellerId:", sid);
    const products = await productModel.find({ sellerId: sid }).sort({ createdAt: -1 });
    return res.json({ products });
  } catch (err) {
    console.error("GET /seller/products/debug error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * DELETE /product/:id
 */
sellerRouter.delete("/product/:id", sellerMiddleWare, async (req, res) => {
  try {
    const sellerId = req.userId;
    const productId = req.params.id;

    const product = await productModel.findOne({ _id: productId, sellerId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(product.imagePublicId);
      } catch (cloudErr) {
        console.warn("Cloudinary destroy failed:", cloudErr);
        // proceed to delete DB record even if Cloudinary deletion failed
      }
    }

    await productModel.deleteOne({ _id: productId });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE /product/:id error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * PATCH /product/:id
 */
sellerRouter.patch("/product/:id", sellerMiddleWare, async (req, res) => {
  try {
    const sellerId = req.userId;
    const productId = req.params.id;
    const updates = req.body;

    const product = await productModel.findOne({ _id: productId, sellerId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Only update allowed fields
    const allowedFields = ["name", "description", "price", "stock", "category", "isActive"];
    allowedFields.forEach((field) => {
      if (updates[field] !== undefined) product[field] = updates[field];
    });

    product.updatedAt = Date.now();
    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("PATCH /product/:id error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { sellerRouter };
