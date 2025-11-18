// models/cart.js
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "buyer", required: true },   // <-- 'buyer' lowercase
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true }, // <-- 'product' lowercase
  quantity: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

// model name 'cart' (lowercase) for consistency with other models
const cartModel = mongoose.model("cart", cartItemSchema);

// export as object to match: const { cartModel } = require("../models/cart");
module.exports = { cartModel };
