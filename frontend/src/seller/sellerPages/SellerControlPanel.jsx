import React, { useEffect, useState } from "react";
import { addProduct, getSellerProducts, deleteProduct } from "../../api/sellerApi";

export function SellerControlPanel() {
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

  // ✅ Load products when page mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data = await getSellerProducts();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ Handle product upload form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addProduct(formData);
      alert(response.message);
      setFormData({ name: "", description: "", price: "", stock: "", category: "", image: null });
      fetchProducts(); // Refresh list
    } catch (err) {
      alert("Error uploading product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // ✅ Handle image file
  function handleFileChange(e) {
    setFormData({ ...formData, image: e.target.files[0] });
  }

  // ✅ Delete product
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-lg p-6"
      >
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
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow-sm">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-gray-600">₹{p.price}</p>
            <p className="text-sm">{p.category}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
