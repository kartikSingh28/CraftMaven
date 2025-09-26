const mongoose=require("mongoose");

const cartItemSchema=new mongoose.Schema({
    buyerId:{type:mongoose.Schema.Types.ObjectId,ref:"Buyer",required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
    quantity:{type:Number,default:1,min:1},
},{timestamps:true});

const cartModel=mongoose.model("CartItem",cartItemSchema);

module.exports={ cartModel };
