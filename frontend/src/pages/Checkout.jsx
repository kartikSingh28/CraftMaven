// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Footer} from "../components/Footer";

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
  <div className="min-h-screen bg-[#F7F3EC] pt-28 pb-16">
    <div className="max-w-6xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#164E47] mb-8">Checkout</h1>

      {/* Main white card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Product list */}
        <div className="space-y-6">
          {items.map((it) => (
            <div
              key={it._id}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 border-b pb-6"
            >
              <div className="w-full md:w-36 flex-shrink-0">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-50 shadow-sm mx-auto md:mx-0">
                  <img
                    src={it.productId?.image || "/placeholder.png"}
                    alt={it.productId?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-semibold text-[#164E47]">
                      {it.productId?.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Qty: {it.quantity}</div>
                    <div className="text-sm text-gray-400 mt-2">{(it.productId?.category || "").split(",").slice(0,2).join(" • ")}</div>
                  </div>

                  <div className="mt-1 text-right">
                    <div className="text-lg font-semibold text-[#C75A2A]">
                      ₹{((it.productId?.price || 0) * (it.quantity || 1)).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">Incl. taxes (if any)</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating order summary */}
        <div className="mt-8">
          <div className="relative">
            {/* center card on larger screens */}
            <div className="mx-auto max-w-md">
              <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-6">
                <div className="text-sm text-gray-500 mb-4">Order Summary</div>

                <div className="flex justify-between items-center mb-6">
                  <div className="text-base font-medium text-gray-700">Subtotal</div>
                  <div className="text-lg font-bold text-[#164E47]">₹{subtotal.toFixed(2)}</div>
                </div>

                <button
                  onClick={onPay}
                  disabled={processing}
                  className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg font-semibold 
                             bg-[#164E47] text-white hover:bg-[#0F3A35] transition disabled:opacity-50"
                >
                  {processing ? "Processing..." : `Pay ₹${subtotal.toFixed(2)}`}
                </button>

                <div className="text-xs text-gray-400 text-center mt-3">
                  Secure checkout — payments processed via Cashfree
                </div>
              </div>
            </div>

            {/* subtle decorative shadow beneath summary (desktop only) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-80 h-6 rounded-b-xl blur-sm"
                 style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06), transparent)" }} />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

}
