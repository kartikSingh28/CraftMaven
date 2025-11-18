// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  async function loadCart() {
    setLoading(true);
    setErr("");
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      setErr("Please sign in to view your cart.");
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/api/v1/buyer/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Failed to fetch cart");
      setItems(data.cart || []);
    } catch (e) {
      console.error("loadCart", e);
      setErr(e.message || "Failed to load cart");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
    const handler = () => loadCart();
    window.addEventListener("cart:updated", handler);
    return () => window.removeEventListener("cart:updated", handler);
  }, []);

  async function removeItem(productId) {
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      alert("Please sign in to remove items.");
      return;
    }
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/v1/buyer/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Remove failed");
      await loadCart();
      window.dispatchEvent(new CustomEvent("cart:updated"));
    } catch (e) {
      console.error("removeItem", e);
      alert(e.message || "Remove failed");
    }
  }

  // Simple checkout: iterates items and calls purchase per item
  async function checkoutAll() {
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      alert("Please sign in to checkout.");
      return;
    }
    if (items.length === 0) {
      alert("Cart is empty.");
      return;
    }
    if (!window.confirm("Proceed to purchase all items in cart?")) return;

    setCheckoutLoading(true);
    try {
      for (const it of items) {
        const productId = it.productId?._id || it.productId;
        const quantity = it.quantity || 1;
        const resp = await fetch(`${API_BASE}/api/v1/buyer/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message || "Purchase failed");
      }

      alert("Purchase successful");
      await loadCart();
      window.dispatchEvent(new CustomEvent("cart:updated"));
      navigate("/"); // or navigate("/orders") if you add order history
    } catch (e) {
      console.error("checkoutAll", e);
      alert(e.message || "Checkout failed");
    } finally {
      setCheckoutLoading(false);
    }
  }

  const totalAmount = items.reduce((sum, it) => {
    const price = it.productId?.price ?? 0;
    const qty = it.quantity ?? 1;
    return sum + price * qty;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {loading ? (
        <div>Loading…</div>
      ) : err ? (
        <div className="text-red-600 mb-4">{err}</div>
      ) : items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((it) => {
              const prod = it.productId || {};
              return (
                <div key={String(it._id)} className="flex gap-4 items-center border rounded p-3 bg-white">
                  <img
                    src={prod.image || "/placeholder.png"}
                    alt={prod.name}
                    className="w-28 h-28 object-contain bg-gray-100 p-2"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{prod.name}</div>
                    <div className="text-sm text-gray-600">₹{prod.price} × {it.quantity}</div>
                    <div className="text-sm text-gray-500">Seller: {prod.sellerName || "Unknown"}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(prod._id)}
                      className="text-sm px-3 py-1 rounded bg-red-50 text-red-700 border"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Page 1 of 1</div>
              <div className="text-xl font-semibold mt-1">Total: ₹{totalAmount}</div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Continue shopping
              </button>
              <button
                onClick={checkoutAll}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing…" : "Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
