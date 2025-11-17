
const { Router } = require("express");
const { productModel } = require("../db");
const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 12, 100);
    const q = (req.query.q || "").trim();
    const category = (req.query.category || "").trim();

    const filter = { isActive: true };
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }
    if (category) filter.category = category;

    const total = await productModel.countDocuments(filter);
    const pages = Math.max(Math.ceil(total / limit), 1);
    const skip = (page - 1) * limit;

    const products = await productModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sellerId", "shopName")
      .lean();

    const mapped = products.map((p) => ({
      ...p,
      sellerName: p.sellerId?.shopName || "Unknown Seller",
      sellerId: undefined,
    }));

    res.json({ products: mapped, total, page, pages });
  } catch (err) {
    console.error("GET /products error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { productRouter };
