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

// safe env reading
const APP_ID = (process.env.CASHFREE_APP_ID || "").trim();
const SECRET = (process.env.CASHFREE_SECRET_KEY || "").trim();
const ENV = (process.env.CASHFREE_ENV || "sandbox").toLowerCase();
const CF_API_VERSION = (process.env.CASHFREE_API_VERSION || "2025-01-01").trim();

const CF_BASE =
  ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

if (!APP_ID || !SECRET) {
  console.warn("Missing Cashfree keys — set CASHFREE_APP_ID & CASHFREE_SECRET_KEY in env");
}

// helper: create order on Cashfree (robust)
async function cfCreateOrder(body) {
  const url = `${CF_BASE}/orders`;
  const headers = {
    "Content-Type": "application/json",
    "x-client-id": APP_ID,
    "x-client-secret": SECRET,
    "x-api-version": CF_API_VERSION,
  };

  console.log("[cfCreateOrder] POST", url);
  console.log("[cfCreateOrder] header presence:", !!APP_ID, !!SECRET, "api_version:", CF_API_VERSION);
  console.log("[cfCreateOrder] body:", body);

  try {
    const resp = await axios.post(url, body, { headers, timeout: 15000 });
    console.log("[cfCreateOrder] status:", resp.status, "data:", resp.data);
    return resp.data;
  } catch (err) {
    console.error("[cfCreateOrder] axios error:", err.message);
    if (err.response) {
      console.error("[cfCreateOrder] response.status:", err.response.status);
      console.error("[cfCreateOrder] response.data:", JSON.stringify(err.response.data, null, 2));
      const e = new Error("Cashfree API error");
      e.status = err.response.status;
      e.data = err.response.data;
      throw e;
    } else if (err.request) {
      console.error("[cfCreateOrder] no response (request made)", err.request);
      const e = new Error("Cashfree no response");
      e.data = { message: "No response from Cashfree (network/timeout?)" };
      throw e;
    } else {
      throw err;
    }
  }
}

// helper: get order details (robust)
async function cfGetOrder(orderId) {
  const url = `${CF_BASE}/orders/${encodeURIComponent(orderId)}`;
  const headers = {
    "x-client-id": APP_ID,
    "x-client-secret": SECRET,
    "x-api-version": CF_API_VERSION,
  };
  console.log("[cfGetOrder] GET", url);

  try {
    const resp = await axios.get(url, { headers, timeout: 15000 });
    console.log("[cfGetOrder] status:", resp.status, "data:", resp.data);
    return resp.data;
  } catch (err) {
    console.error("[cfGetOrder] axios error:", err.message);
    if (err.response) {
      console.error("[cfGetOrder] response.status:", err.response.status);
      console.error("[cfGetOrder] response.data:", JSON.stringify(err.response.data, null, 2));
      const e = new Error("Cashfree API error");
      e.status = err.response.status;
      e.data = err.response.data;
      throw e;
    } else if (err.request) {
      console.error("[cfGetOrder] no response (request made)", err.request);
      const e = new Error("Cashfree no response");
      e.data = { message: "No response from Cashfree (network/timeout?)" };
      throw e;
    } else {
      throw err;
    }
  }
}

/**
 * POST /api/v1/payment/create-order
 * Creates a Cashfree order for the buyer's cart.
 * Buyer ID is pulled from buyerMiddleware (req.userId)
 */
PaymentRouter.post("/create-order", buyerMiddleware, async (req, res) => {
  try {
    const buyerId = req.userId;
    console.log("[create-order] buyerId:", buyerId, "userEmail:", req.userEmail, "userPhone:", req.userPhone);

    // Load buyer details from DB (to fetch phone/email if not present in JWT)
    let buyer = null;
    try {
      buyer = await buyerModel.findById(buyerId).lean();
    } catch (dbErr) {
      console.warn("[create-order] could not load buyer from DB:", dbErr && (dbErr.message || dbErr));
    }

    // Resolve customer email / phone (prefer req values, then DB, else fallback)
    const customerEmail = (req.userEmail || buyer?.email || "").toString().trim();
    let customerPhoneRaw = (req.userPhone || buyer?.phone || "").toString().trim();

    // Basic normalization: keep only digits, ensure at least 10 digits
    const digits = (customerPhoneRaw.match(/\d/g) || []).join("");
    let customerPhone = digits;
    if (!customerPhone || customerPhone.length < 8) {
      // fallback to a safe test phone for sandbox — log a warning so you can require phone later
      customerPhone = process.env.DEBUG_FALLBACK_PHONE || "9999999999";
      console.warn(`[create-order] buyer phone missing or invalid for buyer ${buyerId}. Using fallback phone: ${customerPhone}`);
    }

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
      order_amount: Number(totalINR).toFixed(2), // "2499.00"
      order_currency: "INR",
      customer_details: {
        customer_id: String(buyerId),
        customer_email: customerEmail || "test@example.com",
        customer_phone: customerPhone,
      },
      // optional: return_url or notify_url if you want redirect/webhook flows
    };

    const cfResp = await cfCreateOrder(orderBody);
    const data = cfResp?.data || cfResp;

    return res.json({
      message: "Order created",
      orderId,
      cashfree: data,
      appId: APP_ID ? "present" : "missing",
    });
  } catch (err) {
    // prefer structured e.data from our cf helpers
    console.error("create-order error:", err && (err.data || err.message || err));
    if (err.data) {
      return res.status(err.status || 500).json({ message: "Cashfree error", cfError: err.data });
    }
    return res.status(500).json({ message: "Failed to create order", error: err.message || err });
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

    const payments = cfData?.payments || [];
    const orderStatus = (cfData?.order_status || cfData?.orderStatus || "").toString().toUpperCase();

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
        status: "pending",
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
    console.error("verify error:", err && (err.data || err.message || err));
    if (err.data) {
      return res.status(err.status || 500).json({ message: "Cashfree error", cfError: err.data });
    }
    return res.status(500).json({ message: "Payment verification failed", error: err.message || err });
  }
});

module.exports = PaymentRouter;
