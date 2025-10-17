import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import logo from "../assets/LOGO.png";
import { NavBar } from "../components/Navbar";
import ShowcaseCardComponent from "../components/ShowcaseCardComponent";
import { Footer } from "../components/Footer";

const products = [
  { title: "Handcrafted Vase", price: 499, image: "https://via.placeholder.com/300x200" },
  { title: "Wooden Sculpture", price: 899, image: "https://via.placeholder.com/300x200" },
  { title: "Clay Pottery Set", price: 649, image: "https://via.placeholder.com/300x200" },
  { title: "Artisan Basket", price: 299, image: "https://via.placeholder.com/300x200" },
  { title: "Jute Handbag", price: 799, image: "https://via.placeholder.com/300x200" },
  { title: "Decor Mirror", price: 1099, image: "https://via.placeholder.com/300x200" },
];

export function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    document.body.style.overflow = "hidden";
    return (
      <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden bg-gradient-to-br from-[#2F6F68] via-[#3A7C6B] to-[#D17A45]">
        <div className="absolute w-80 h-80 bg-[#C65A2E]/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute w-[28rem] h-[28rem] bg-[#1B4D4A]/20 rounded-full blur-2xl animate-ripple-slow"></div>

        <img
          src={logo}
          alt="CraftMaven Logo"
          className="relative w-80 sm:w-96 md:w-[28rem] object-contain animate-logo-fade drop-shadow-[0_0_35px_rgba(198,90,46,0.45)]"
        />
      </div>
    );
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-[#1B4D4A] to-[#C65A2E] text-white">
        <div className="text-center px-6">
          <h1 className="text-5xl font-extrabold mb-3 font-serif">Festive Handcrafted Collection</h1>
          <p className="text-lg opacity-90 mb-6">
            Explore limited edition artisanal designs crafted with love.
          </p>
          <button className="bg-[#F7F3EC] text-[#C65A2E] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#C65A2E] hover:text-white transition duration-300">
            Shop Now
          </button>
        </div>
      </div>

      {/* Showcase Section */}
      <section className="bg-gradient-to-b from-[#F7F3EC] via-[#FFF9F5] to-[#FFFFFF] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1B4D4A] mb-10">Discover the Craft Story</h2>
          <p className="text-[#444] max-w-2xl mx-auto mb-10">
            Each product is a piece of art — handwoven, sculpted, and crafted by passionate artisans.
            Let’s celebrate the timeless beauty of handmade creations.
          </p>

          <ShowcaseCardComponent />
        </div>
      </section>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-[#1B4D4A] mb-10">Trending This Season</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-[#C65A2E] font-bold mt-2">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    
    </>
  );
}
