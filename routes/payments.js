// routes/payment.js
const { Router } = require("express");
const axios = require("axios");
const { buyerMiddleware } = require("../middlewares/buyermiddleware");
const { cartModel } = require("../models/cart");
const { purchaseModel, productModel, buyerModel } = require("../db");

const PaymentRouter = Router();
PaymentRouter.use((req, res, next) => {
  console.log(`[payment router] ${req.method} ${req.originalUrl}`);
  next();
});


const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET = process.env.CASHFREE_SECRET_KEY;
const ENV = (process.env.CASHFREE_ENV || "sandbox").toLowerCase();

const CF_BASE =
  ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

if (!APP_ID || !SECRET) {
  console.warn("Missing Cashfree keys — set CASHFREE_APP_ID & CASHFREE_SECRET_KEY in .env");
}

// helper: create order on Cashfree
async function cfCreateOrder(body) {
  const url = `${CF_BASE}/orders`;
  const headers = {
    "Content-Type": "application/json",
    "x-client-id": APP_ID,
    "x-client-secret": SECRET,
  };
  const resp = await axios.post(url, body, { headers });
  return resp.data;
}

// helper: get order details
async function cfGetOrder(orderId) {
  const url = `${CF_BASE}/orders/${encodeURIComponent(orderId)}`;
  const headers = {
    "x-client-id": APP_ID,
    "x-client-secret": SECRET,
  };
  const resp = await axios.get(url, { headers });
  return resp.data;
}

/**
 * POST /api/v1/payment/create-order
 * Creates a Cashfree order for the buyer's cart.
 * Buyer ID is pulled from buyerMiddleware (req.userId)
 */
PaymentRouter.post("/create-order", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;

    // compute total securely from cart
    const items = await cartModel.find({ buyerId }).populate("productId").lean();
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalINR = items.reduce((s, it) => {
      const price = Number(it.productId?.price || 0);
      const qty = Number(it.quantity || 1);
      return s + price * qty;
    }, 0);

    if (totalINR < 1) {
      return res.status(400).json({ message: "Order total must be at least ₹1" });
    }

    // Your internal order id
    const orderId = `ORD_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    const orderBody = {
      order_id: orderId,
      order_amount: Number(totalINR).toFixed(2),
      order_currency: "INR",
      customer_details: {
        customer_id: String(buyerId),
        customer_email: req.userEmail || "", // optional if your middleware provides
        customer_phone: req.userPhone || "",
      },
      // optional: return_url or notify_url if you want redirect/webhook flows
    };

    const cfResp = await cfCreateOrder(orderBody);
    // cfResp structure typically: { status: "OK", message: "...", data: { order_id, payment_session_id, ... } }
    const data = cfResp?.data || cfResp;

    return res.json({
      message: "Order created",
      orderId,
      cashfree: data,
      appId: APP_ID,
    });
  } catch (err) {
    console.error("create-order error:", err?.response?.data || err?.message || err);
    return res.status(500).json({ message: "Failed to create order" });
  }
});

/**
 * POST /api/v1/payment/verify
 * Body: { orderId }
 * Server fetches order status from Cashfree, and if payment success -> create purchases & clear cart
 */
PaymentRouter.post("/verify", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ message: "Missing orderId" });

    const cfOrderResp = await cfGetOrder(orderId);
    const cfData = cfOrderResp?.data || cfOrderResp;

    // Inspect payments or order_status
    // Different Cashfree versions return different fields; we attempt common ones:
    const payments = cfData?.payments || [];
    const orderStatus = (cfData?.order_status || cfData?.orderStatus || "").toString().toUpperCase();

    // consider success if any payment has status SUCCESS or order_status === 'PAID'
    const successfulPayment = (payments || []).find(
      (p) =>
        (p.payment_status || p.status || "").toString().toUpperCase() === "SUCCESS" ||
        (p.payment_status || p.status || "").toString().toUpperCase() === "PAID"
    );

    const isPaid = !!successfulPayment || orderStatus === "PAID" || orderStatus === "COMPLETED" || orderStatus === "PAID_TO_MERCHANT";

    if (!isPaid) {
      console.warn("Payment not successful yet for order", orderId, { orderStatus, payments: payments.length });
      return res.status(400).json({ message: "Payment not successful yet", cfData });
    }

    // Create purchase records from current cart
    const items = await cartModel.find({ buyerId }).populate("productId").lean();

    const createdPurchases = [];
    for (const it of items) {
      const product = it.productId;
      if (!product) continue;
      const qty = Number(it.quantity || 1);
      const totalPrice = Number(product.price || 0) * qty;

      const purchase = await purchaseModel.create({
        buyerId,
        productId: product._id,
        quantity: qty,
        totalPrice,
        status: "pending", // you can mark 'paid' if you prefer
        purchaseDate: new Date()
      });

      // attach to buyer
      await buyerModel.findByIdAndUpdate(buyerId, { $push: { purchases: purchase._id } });

      // optional: decrement stock
      if (product.stock && product.stock > 0) {
        await productModel.findByIdAndUpdate(product._id, { $inc: { stock: -qty } });
      }

      createdPurchases.push(purchase);
    }

    // clear cart
    await cartModel.deleteMany({ buyerId });

    return res.json({ message: "Payment verified and purchases recorded", purchases: createdPurchases, cfData });
  } catch (err) {
    console.error("verify error:", err?.response?.data || err?.message || err);
    return res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = PaymentRouter;

