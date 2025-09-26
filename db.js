const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now }
});

const buyerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
  purchases: [{ type: ObjectId, ref: "purchase" }]
});

const sellerSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  shopName: String,
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: String,
  stock: { type: Number, default: 0, min: 0 },
  sellerId: { type: ObjectId, ref: "seller", required: true },
  isActive: { type: Boolean, default: true },
  image: { type: String }
});

const purchaseSchema = new Schema({
  buyerId: { type: ObjectId, ref: "buyer", required: true },
  productId: { type: ObjectId, ref: "product", required: true },
  quantity: { type: Number, default: 1, min: 1 },
  totalPrice: { type: Number, min: 0 },
  status: { 
    type: String, 
    enum: ["pending", "shipped", "delivered", "cancelled"], 
    default: "pending" 
  },
  purchaseDate: { type: Date, default: Date.now }
});

const buyerModel = mongoose.model("buyer", buyerSchema);
const adminModel = mongoose.model("admin", adminSchema);
const sellerModel = mongoose.model("seller", sellerSchema);
const productModel = mongoose.model("product", productSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  buyerModel,
  adminModel,
  sellerModel,
  productModel,
  purchaseModel
};
