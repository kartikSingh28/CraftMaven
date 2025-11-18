// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function Checkout() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  async function fetchCart() {
    setLoading(true);
    setErr("");
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/checkout`);
    try {
      const res = await axios.get(`${API_BASE}/api/v1/buyer/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data?.cart || []);
    } catch (e) {
      console.error("Fetch cart error:", e);
      setErr(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const subtotal = items.reduce((s, it) => s + (it.productId?.price || 0) * (it.quantity || 1), 0);

  async function onPay() {
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/checkout`);
    if (!items.length) return alert("Cart empty");

    setProcessing(true);
    setErr("");

    try {
      // create order on backend (server computes total)
      const createResp = await axios.post(`${API_BASE}/api/v1/payment/create-order`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { orderId, cashfree, appId } = createResp.data;
      // cashfree may include payment_session_id in data (check its exact key)
      const paymentSessionId = cashfree?.payment_session_id || cashfree?.paymentSessionId || cashfree?.payment_session || null;
      const paymentLink = cashfree?.payment_link || null;

      // If the backend returned a payment link instead of a session ID, open it:
      if (paymentLink) {
        window.open(paymentLink, "_blank");
        setProcessing(false);
        return;
      }

      if (!paymentSessionId) {
        throw new Error("Missing payment session id from Cashfree response");
      }

      // Load Cashfree SDK if not present
      if (!window.Cashfree) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://sdk.cashfree.com/js/v3/cashfree.js"; // official SDK url
          s.onload = resolve;
          s.onerror = () => reject(new Error("Failed to load Cashfree SDK"));
          document.body.appendChild(s);
        });
      }

      // Initialize the SDK (sandbox mode)
      // Cashfree exposes 'Cashfree' global factory
      const cf = window.Cashfree({ mode: "sandbox" }); // use "production" for live
      // Open checkout using paymentSessionId
      cf.checkout({
        paymentSessionId,
        // optional callback; shape may vary by SDK version
        onSuccess: async (data) => {
          // data may contain orderId / cf_payment_id / status depending on SDK
          try {
            // server verifies order/payment status with Cashfree
            const verifyResp = await axios.post(`${API_BASE}/api/v1/payment/verify`, {
              orderId,
            }, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const purchases = verifyResp.data.purchases || [];
            navigate("/order-success", { state: { purchases, message: verifyResp.data.message } });
          } catch (err) {
            console.error("verify failed:", err);
            alert(err.response?.data?.message || "Payment verification failed");
            setProcessing(false);
          }
        },
        onFailure: (errData) => {
          console.warn("Cashfree checkout failure", errData);
          alert("Payment failed or was cancelled");
          setProcessing(false);
        },
      });

    } catch (err) {
      console.error("create order error:", err);
      setErr(err.response?.data?.message || err.message || "Failed to initiate payment");
      setProcessing(false);
    }
  }

  if (loading) return <div className="p-6">Loading cart…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          {items.map((it) => (
            <div key={it._id} className="flex items-center gap-4 border-b py-3">
              <img src={it.productId?.image || "/placeholder.png"} alt={it.productId?.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{it.productId?.name}</div>
                <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
              </div>
              <div>₹{((it.productId?.price || 0) * (it.quantity || 1)).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded shadow">
          <div className="text-sm text-gray-600 mb-2">Order Summary</div>
          <div className="flex justify-between font-medium mb-4">
            <div>Subtotal</div>
            <div>₹{subtotal.toFixed(2)}</div>
          </div>

          <button
            disabled={processing}
            onClick={onPay}
            className="w-full bg-[#1B4D4A] text-white py-2 rounded"
          >
            {processing ? "Processing..." : `Pay ₹${subtotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
