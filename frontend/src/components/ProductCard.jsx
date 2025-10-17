import React from "react";

function ProductCard({ title, price, image }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">${price}</p>
        <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
