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
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
          min="0"
          step="0.01"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min="0"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-4">Your Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p._id} className="border p-4 rounded shadow-sm">
              <img
                src={p.image || "/placeholder.png"}
                alt={p.name}
                className="w-full h-48 object-cover rounded mb-2"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-gray-600">₹{p.price}</p>
              <p className="text-sm">{p.category}</p>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 text-sm mt-2">
                Delete
              </button>
            </div>
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
}

export default SellerControlPanel;
