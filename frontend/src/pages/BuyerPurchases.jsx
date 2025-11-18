// src/pages/BuyerPurchases.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function BuyerPurchases() {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchPurchases();
    // eslint-disable-next-line
  }, []);

  async function fetchPurchases() {
    setLoading(true);
    setErr("");
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      setErr("Not signed in");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/api/v1/buyer/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(res.data.purchases || []);
    } catch (e) {
      console.error("fetch purchases error", e);
      setErr(e.response?.data?.message || "Failed to fetch purchases");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-6">Loading purchases…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>

      {purchases.length === 0 ? (
        <div className="p-6 bg-white rounded shadow text-gray-600">No purchases yet.</div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow flex items-start gap-4">
              <img src={p.productId?.image || "/placeholder.png"} alt={p.productId?.name || "product"} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{p.productId?.name || p.productId}</div>
                <div className="text-sm text-gray-500">Qty: {p.quantity}</div>
                <div className="text-sm text-gray-700 mt-2">Total: ₹{(p.totalPrice || 0).toFixed(2)}</div>
                <div className="text-sm text-gray-500 mt-1">Status: {p.status}</div>
                <div className="text-xs text-gray-400 mt-1">Ordered: {new Date(p.purchaseDate).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
