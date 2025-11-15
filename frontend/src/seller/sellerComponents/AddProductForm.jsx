import { useState } from "react";
import { addProduct } from "../../api/sellerApi";

const AddProductForm = ({ onProductAdded }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    try {
      const res = await addProduct(formData);
      setMessage(res.data.message);
      onProductAdded();
      setForm({ name: "", description: "", price: "", stock: "", category: "" });
      setImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Add New Product</h2>

      <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" required />
      <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 rounded" />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 rounded" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 rounded" />

      {image && <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 object-cover mx-auto" />}

      <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" disabled={loading}>
        {loading ? "Uploading..." : "Add Product"}
      </button>

      {message && <p className="text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default AddProductForm;
