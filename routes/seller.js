const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary.js");
const jwt = require("jsonwebtoken");
const { sellerModel, productModel } = require("../db.js");
const { sellerMiddleWare } = require("../middlewares/sellermiddleware.js");
const { JWT_SELLER_PASSWORD } = require("../config.js");
const bcrypt = require("bcrypt");
const zod = require("zod");

const sellerRouter = Router();

// 🔹 Multer setup for temporary local storage
const upload = multer({ dest: "uploads/" });


sellerRouter.post("/signup", async (req, res) => {
  const schema = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
    address: zod.string().min(5).optional(),
    shopName: zod.string().min(3),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: "Incorrect data format", error: parsed.error });

  const { email, password, firstName, lastName, address, shopName } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sellerModel.create({ email, password: hashedPassword, firstName, lastName, address, shopName });
    res.status(201).json({ message: "Successfully registered as Seller" });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: "Seller already exists" });
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


sellerRouter.post("/signin", async (req, res) => {
  const schema = zod.object({
    email: zod.string().email().min(5),
    password: zod.string().min(5),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: "Invalid data format", error: parsed.error });

  const { email, password } = parsed.data;

  try {
    const seller = await sellerModel.findOne({ email });
    if (!seller) return res.status(403).json({ message: "Seller not found" });

    const valid = await bcrypt.compare(password, seller.password);
    if (!valid) return res.status(403).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: seller._id, role: "seller" }, JWT_SELLER_PASSWORD, { expiresIn: "1h" });

    res.json({ message: "Signin successful", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


sellerRouter.post("/sell", sellerMiddleWare, upload.single("image"), async (req, res) => {
  try {
    const sellerId = req.userId;
    const { name, description, price, stock, category } = req.body;

    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    // Upload image to Cloudinary if provided
    let imageUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = uploadResult.secure_url;
    }

    const product = await productModel.create({
      name,
      description: description || "",
      price,
      stock: stock || 0,
      category: category || "general",
      sellerId,
      isActive: true,
      image: imageUrl,
    });

    res.status(201).json({ message: "Product listed successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

sellerRouter.get("/products", sellerMiddleWare, async (req, res) => {
  try {
    const sellerId = req.userId;
    const products = await productModel.find({ sellerId });
    res.json({ message: "Products fetched successfully", products });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


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

    await product.save();
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { sellerRouter };
