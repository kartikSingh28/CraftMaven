// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import {Footer} from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function Cart() {
  const [items, setItems] = useState([]); // items are cart documents with productId populated
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCart() {
    setLoading(true);
    setErr("");
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      navigate("/signin?redirect=/cart");
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/v1/buyer/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // server returns { message, cart: [...] }
      setItems(res.data?.cart || []);
    } catch (e) {
      console.error("Fetch cart error:", e);
      setErr(e.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  }

  // Increase quantity by 1 (reuses cart/add endpoint which increments)
  async function increaseQty(productId) {
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/cart`);

    setActionLoading(true);
    try {
      await axios.post(
        `${API_BASE}/api/v1/buyer/cart/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (e) {
      console.error("Increase qty error:", e);
      alert(e.response?.data?.message || "Failed to increase quantity");
    } finally {
      setActionLoading(false);
    }
  }

  // Decrease by 1 (calls decrement endpoint)
  async function decreaseQty(productId) {
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/cart`);

    setActionLoading(true);
    try {
      // backend expects PATCH /cart/:productId/decrement with { dec: 1 }
      await axios.patch(
        `${API_BASE}/api/v1/buyer/cart/${productId}/decrement`,
        { dec: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (e) {
      console.error("Decrease qty error:", e);
      alert(e.response?.data?.message || "Failed to decrease quantity");
    } finally {
      setActionLoading(false);
    }
  }

  // Remove item entirely
  async function removeItem(productId) {
    if (!window.confirm("Remove this item from cart?")) return;
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/cart`);

    setActionLoading(true);
    try {
      await axios.delete(`${API_BASE}/api/v1/buyer/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (e) {
      console.error("Remove item error:", e);
      alert(e.response?.data?.message || "Failed to remove item");
    } finally {
      setActionLoading(false);
    }
  }

  // Calculate totals
  const subtotal = items.reduce((sum, it) => {
    const price = it.productId?.price ?? 0;
    const qty = it.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  function proceedToCheckout() {
    if (!items.length) {
      alert("Cart is empty");
      return;
    }

    navigate("/checkout", { state: { items } });
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-extrabold text-[#164E47] mb-8">Your Cart</h1>

        {loading ? (
          <div className="text-gray-600">Loading cart...</div>
        ) : err ? (
          <div className="text-red-600">{err}</div>
        ) : items.length === 0 ? (
          <div className="text-gray-600">Your cart is empty.</div>
        ) : (
          <>
            {/* Items list — full width card */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              {items.map((it) => {
                const product = it.productId || {};
                const productId = product._id || it.productId; // fallback
                return (
                  <div
                    key={it._id}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 bg-white rounded-lg p-4 transition-shadow hover:shadow-lg"
                  >
                    {/* image */}
                    <div className="w-full md:w-36 flex-shrink-0">
                      <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-50 border">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                        />
                      </div>
                    </div>

                    {/* details */}
                    <div className="flex-1 w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-lg font-semibold text-[#164E47]">
                            {product.name}
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-sm text-gray-500">Qty: {it.quantity}</span>
                            <span className="inline-block text-xs px-2 py-1 rounded-full bg-[#F5F0EA] text-[#C75A2A] font-medium">
                              Seller: {product.sellerName || "Unknown"}
                            </span>
                          </div>

                          <div className="text-sm text-gray-400 mt-2">
                            {(product.category || "").split(",").slice(0, 2).join(" • ")}
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-xl font-bold text-[#C75A2A]">
                            ₹{(product.price * it.quantity).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">Incl. taxes</div>
                        </div>
                      </div>

                      {/* quantity controls */}
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => decreaseQty(productId)}
                          disabled={actionLoading}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white text-lg text-gray-700 hover:shadow-sm transition disabled:opacity-50"
                        >
                          −
                        </button>

                        <div className="px-4 py-1.5 border rounded-md text-sm font-medium">
                          {it.quantity}
                        </div>

                        <button
                          onClick={() => increaseQty(productId)}
                          disabled={actionLoading}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 bg-white text-lg text-gray-700 hover:shadow-sm transition disabled:opacity-50"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeItem(productId)}
                          className="ml-4 text-sm text-red-600 hover:underline"
                          disabled={actionLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order summary — BELOW items and centered */}
            <div className="mt-8 flex justify-center">
              <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">Items</div>
                    <div className="font-medium text-gray-700">{items.length}</div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-lg font-semibold text-[#164E47]">Subtotal</div>
                    <div className="text-lg font-semibold text-[#C75A2A]">₹{subtotal.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={proceedToCheckout}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold 
                               bg-[#164E47] text-white hover:bg-[#0F3A35] transition disabled:opacity-50"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-3 text-xs text-gray-400 text-center">
                    Secure payments powered by Cashfree
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
