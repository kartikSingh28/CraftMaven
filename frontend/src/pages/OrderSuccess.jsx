// src/pages/OrderSuccess.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const purchases = state?.purchases || [];
  const msg = state?.message || "Payment successful";

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24 text-center">
      <h1 className="text-3xl font-bold text-[#1B4D4A]">
        🎉 Thank you! {msg}
      </h1>

      <p className="mt-4 text-gray-600">
        Your payment was successful and your order has been placed.
      </p>

      {purchases.length > 0 && (
        <div className="mt-6 bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold text-[#1B4D4A] mb-3">Purchased Items</h2>

          <ul className="space-y-2">
            {purchases.map((p) => (
              <li key={p._id} className="border-b pb-2 text-gray-700">
                Product: <strong>{p.productId?.name || p.productId}</strong> <br />
                Quantity: {p.quantity} <br />
                Total Price: ₹{p.totalPrice}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/buyer/purchases"
          className="bg-[#C65A2E] text-white px-6 py-2 rounded"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="border border-[#1B4D4A] text-[#1B4D4A] px-6 py-2 rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
