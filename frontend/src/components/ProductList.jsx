import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function useQuery(locationSearch) {
  return new URLSearchParams(locationSearch);
}

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function ProductList() {
  const location = useLocation();
  const query = useQuery(location.search);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(Number(query.get("page") || 1));
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const q = query.get("q") || "";
  const category = query.get("category") || "";

  async function load(p = page) {
    try {
      setLoading(true);
      setErr("");
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (category) params.set("category", category);
      params.set("page", p);
      params.set("limit", 12);

      const resp = await fetch(`${API_BASE}/api/v1/products?${params.toString()}`);
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "Failed to fetch products");
      }
      const data = await resp.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
      setPage(data.page || p);
    } catch (e) {
      console.error("ProductList load error:", e);
      setErr(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const newPage = Number(new URLSearchParams(location.search).get("page") || 1);
    setPage(newPage);
    load(newPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  async function addToCart(productId) {
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      navigate(`/signin?redirect=/`);
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/api/v1/buyer/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Add to cart failed");
      // Redirect to cart after success
      navigate("/cart");
    } catch (e) {
      console.error("addToCart error:", e);
      alert(e.message || "Add to cart failed");
    }
  }

  async function buyNow(productId) {
    const token = localStorage.getItem("buyerToken");
    if (!token) {
      navigate(`/signin?redirect=/`);
      return;
    }
    if (!window.confirm("Proceed to buy this item now?")) return;
    try {
      const resp = await fetch(`${API_BASE}/api/v1/buyer/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Purchase failed");
      alert("Purchase successful");
      load(page);
    } catch (e) {
      console.error("buyNow error:", e);
      alert(e.message || "Purchase failed");
    }
  }

  function gotoPage(n) {
    const p = new URLSearchParams(location.search);
    if (n <= 1) p.delete("page");
    else p.set("page", n);
    navigate(`?${p.toString()}`);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {loading ? "Loading..." : `Showing ${products.length} of ${total} products`}
        </div>
      </div>

      {err && <div className="mb-4 text-red-600">{err}</div>}

      {loading ? (
        <div>Loading products…</div>
      ) : products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p._id} className="border rounded shadow-sm p-3 bg-white">
                <Link to={`/product/${p._id}`}>
                  <div className="h-40 w-full mb-3 bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="object-contain h-full w-full"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  </div>
                </Link>

                <Link to={`/product/${p._id}`}>
                  <div className="font-medium text-sm cursor-pointer hover:text-blue-600">
                    {p.name}
                  </div>
                </Link>

                <div className="text-gray-600">₹{p.price}</div>
                <div className="text-xs text-gray-500">{(p.category || "").split(",").join(" • ")}</div>
                <div className="text-xs text-gray-500">Seller: {p.sellerName || "Unknown"}</div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => addToCart(p._id)}
                    className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => buyNow(p._id)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {page} of {pages}
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => gotoPage(page - 1)}
              >
                Prev
              </button>
              <button
                className="px-3 py-1 border rounded disabled:opacity-40"
                disabled={page >= pages}
                onClick={() => gotoPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
