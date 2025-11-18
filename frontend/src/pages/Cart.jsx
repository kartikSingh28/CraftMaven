// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
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
    // some cart items structure: { _id, buyerId, productId: { _id, name, price, image }, quantity }
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
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h1 className="text-2xl font-bold text-[#1B4D4A] mb-6">Your Cart</h1>

      {loading ? (
        <div>Loading cart...</div>
      ) : err ? (
        <div className="text-red-600">{err}</div>
      ) : items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items column */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => {
              const product = it.productId || {};
              const productId = product._id || it.productId; // fallback
              return (
                <div key={it._id} className="flex gap-4 bg-white p-4 rounded shadow-sm items-center">
                  <img
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{product.name}</div>
                    <div className="text-sm text-gray-500">Seller: {product.sellerName || "Unknown"}</div>
                    <div className="text-sm text-gray-700 mt-1">₹{product.price}</div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(productId)}
                        disabled={actionLoading}
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <div className="px-3 py-1 border rounded">{it.quantity}</div>
                      <button
                        onClick={() => increaseQty(productId)}
                        disabled={actionLoading}
                        className="px-3 py-1 border rounded"
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

                  <div className="text-right">
                    <div className="font-semibold">₹{(product.price * it.quantity).toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <div>Items</div>
              <div>{items.length}</div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <div>Subtotal</div>
              <div>₹{subtotal.toFixed(2)}</div>
            </div>

            <div className="mt-4">
              <button
                onClick={proceedToCheckout}
                className="w-full bg-[#1B4D4A] text-white py-2 rounded shadow hover:bg-[#153c3a]"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              You will be redirected to the payment page after checkout.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
