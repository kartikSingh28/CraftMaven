import React from "react";
import ProductList from "../components/ProductList";
import {Footer} from "../components/Footer";

export default function Home2() {
  const buyerName = localStorage.getItem("buyerName");

  return (
    <div className="bg-[#F7F3EC] min-h-screen">
      {/* HERO SECTION */}
      <div className="w-full bg-gradient-to-r from-[#0E4A45] via-[#3E4A3B] to-[#C75A2A] py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-md">
          Welcome{buyerName ? `, ${buyerName}` : ""}! 👋
        </h1>
        <p className="text-lg text-white/90 mt-3 max-w-2xl mx-auto">
          Explore handcrafted products from trusted sellers
        </p>
        <button className="mt-6 bg-[#F7F3EC] text-[#C75A2A] px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition">
          Shop Now
        </button>
      </div>

      {/* PRODUCT SECTION (now on cream bg) */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold mb-6 text-[#164E47]">All Products</h2>
        <ProductList />
      </div>
      <Footer />
    </div>
  );
}
