const mongoose = require("mongoose");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => console.error("Connection error:", err));


const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

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
  purchases:[{type:ObjectId,ref:"purchase"}]
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
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 },
  sellerId: { type: ObjectId, ref: "seller", required: true },
  isActive:{type:Boolean,default:true}
});

const purchaseSchema = new Schema({
  buyerId: { type: ObjectId, ref: "buyer", required: true },
  productId: { type: ObjectId, ref: "product", required: true },
  quantity: { type: Number, default: 1 },
  totalPrice: Number,
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
