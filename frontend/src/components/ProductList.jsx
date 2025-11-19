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
    <div className="px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-[#164e47]">All Products</h2>
        <div className="text-sm text-gray-600">
          {loading ? "Loading..." : `Showing ${products.length} of ${total} products`}
        </div>
      </div>

      {err && <div className="mb-4 text-red-600">{err}</div>}

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading products…</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((p) => (
              <article key={p._id} className="group">
                <div className="product-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition duration-300 ease-out hover:-translate-y-2">
                  <Link to={`/product/${p._id}`} className="block product-image h-64 md:h-56 lg:h-60 overflow-hidden">
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  </Link>

                  <div className="product-body p-5 flex flex-col">
                    <Link to={`/product/${p._id}`}>
                      <h3 className="product-title text-center text-lg font-semibold text-gray-800 mb-1">
                        {p.name}
                      </h3>
                    </Link>

                    <p className="product-price text-center text-orange-600 font-bold mt-1">₹{p.price}</p>

                    <div className="mt-2 text-center text-xs text-gray-500">
                      {(p.category || "").split(",").join(" • ")}
                    </div>
                    <div className="text-center text-xs text-gray-400">Seller: {p.sellerName || "Unknown"}</div>

                    <div className="mt-4 flex items-center justify-center gap-3">
                         <button
  onClick={() => addToCart(p._id)}
  className="px-4 py-1.5 rounded-lg font-semibold text-white 
  bg-[#C75A2A]
  shadow-[0_3px_10px_rgba(199,90,42,0.25)]
  transition-all duration-200"
>
  Add to cart
</button>


<button
  onClick={() => buyNow(p._id)}
  className="px-4 py-1.5 rounded-lg font-semibold text-white 
  bg-[#164E47]
  shadow-[0_3px_10px_rgba(22,78,71,0.25)]
  transition-all duration-200"
>
  Buy now
</button>


                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
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
