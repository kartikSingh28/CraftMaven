import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product by ID
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  async function handleAddToCart() {
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/product/${id}`);

    try {
      await axios.post(
        "http://localhost:3000/api/v1/buyer/cart/add",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/signin");
    }
  }

  function handleBuyNow() {
    const token = localStorage.getItem("buyerToken");
    if (!token) return navigate(`/signin?redirect=/product/${id}`);

    // Redirect to checkout page
    navigate(`/checkout?productId=${id}`);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl shadow-xl max-h-[500px] object-cover"
          />
        </div>

        {/* Right Side: Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-[#1B4D4A]">{product.name}</h1>

          <p className="text-xl mt-2 text-gray-700">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description || "No description provided by the seller."}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Seller: <span className="font-medium">{product.sellerName || "Unknown"}</span>
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Stock: <span className="font-medium">{product.stock}</span>
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#C65A2E] text-white px-5 py-2 rounded-lg shadow hover:bg-[#a94d27] transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-[#1B4D4A] text-white px-5 py-2 rounded-lg shadow hover:bg-[#153c3a] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
