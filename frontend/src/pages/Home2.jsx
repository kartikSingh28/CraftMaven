import React from "react";
import ProductList from "../components/ProductList";

export default function Home2() {
  const buyerName = localStorage.getItem("buyerName");

  return (
    <>
      <div className="bg-[#1B4D4A] text-white py-16 text-center">
        <h1 className="text-4xl font-bold">
          Welcome{buyerName ? `, ${buyerName}` : ""}! 👋
        </h1>
        <p className="text-lg opacity-90 mt-2">
          Explore handcrafted products from trusted sellers
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6">All Products</h2>
        <ProductList />
      </div>
    </>
  );
}
