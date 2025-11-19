// src/components/SellerControlPanel.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, getSellerProducts, deleteProduct } from "../../api/sellerApi";

export function SellerControlPanel() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load products when page mounts
  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) {
      console.warn(
        "SellerControlPanel: no sellerToken found in localStorage — redirecting to seller signin"
      );
      navigate("/seller/signin"); // redirect to signin
      return;
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProducts() {
    try {
      const data = await getSellerProducts();
      console.log("getSellerProducts response:", data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.warn("Unexpected products response shape", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch seller products:", err);
      alert("Could not load your products. Check console/network and ensure you're signed in.");
    }
  }

  // Handle product upload form submission (sends multipart/form-data)
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate minimal fields
      if (!formData.name || formData.price === "") {
        alert("Please provide product name and price.");
        setLoading(false);
        return;
      }

      // Build FormData for multipart upload (multer expects field "image")
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description || "");
      // send price as number-ish string — server will convert
      fd.append("price", formData.price);
      fd.append("stock", formData.stock || 0);
      fd.append("category", formData.category || "general");

      if (formData.image instanceof File) {
        fd.append("image", formData.image);
      }

      const response = await addProduct(fd); // sellerApi.addProduct supports FormData
      console.log("addProduct response:", response);
      alert(response.message || "Product added");

      // reset form and file input
      setFormData({ name: "", description: "", price: "", stock: "", category: "", image: null });
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Refresh list after successful add
      await fetchProducts();
    } catch (err) {
      console.error("Error uploading product:", err);
      // If axios error, attempt to show backend message
      const msg = err?.response?.data?.message || err.message || "Error uploading product.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle image file (store the File object)
  function handleFileChange(e) {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
  }

  // Delete product
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const resp = await deleteProduct(id);
      console.log("deleteProduct response:", resp);
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Delete failed. Check console/network for details.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#164E47] mb-6">Add New Product</h2>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E47]"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E47]"
              required
              min="0"
              step="0.01"
            />
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-200 p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-[#164E47]"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E47]"
              min="0"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#164E47]"
            />

            {/* File input: styled label + hidden input */}
            <div>
              <label
                htmlFor="product-image"
                className="flex items-center justify-center gap-2 border border-dashed border-gray-200 rounded-lg h-full p-2 cursor-pointer hover:border-[#C75A2A] transition"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3l-4 4-4-4" />
                </svg>
                <span className="text-sm text-gray-600">
                  {formData.image ? formData.image.name : "Upload image"}
                </span>
              </label>
              <input
                id="product-image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Tip: use high-quality square images (800×800px) for best results.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 bg-[#164E47] hover:bg-[#0F3A35] text-white px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>

        {/* Your products */}
        <h3 className="text-2xl font-semibold mt-10 mb-4 text-[#164E47]">Your Products</h3>

        {products.length === 0 ? (
          <div className="text-gray-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                <div className="w-full h-48 bg-gray-50">
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
                    }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-[#164E47]">{p.name}</h4>
                    <div className="text-lg font-bold text-[#C75A2A]">₹{p.price}</div>
                  </div>

                  <div className="text-sm text-gray-500 mt-2">{p.category}</div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-gray-400">ID: {p._id}</div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Delete
                      </button>
                      {/* optional: link to edit page could be added here */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerControlPanel;
