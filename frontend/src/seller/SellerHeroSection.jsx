import React, { useState, useEffect } from "react";
import image1 from "../assets/sellerHero.png";
import image2 from "../assets/sellerHero2.png";
import image3 from "../assets/sellerHero3.png";
import logo from "../assets/LOGO.png";

export function SellerHeroSection() {
  const showcases = [
    {
      img: image1,
      quote: "Empowering artisans to share their craft with the world.",
    },
    {
      img: image2,
      quote: "Where creativity meets opportunity — only on CraftMaven.",
    },
    {
      img: image3,
      quote: "Join thousands of creators growing their business with us.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % showcases.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex justify-center items-center bg-[#F7F3EC] py-10 pt-24">
      <div className="flex flex-col md:flex-row-reverse bg-white shadow-lg rounded-2xl overflow-hidden w-[90%] max-w-6xl transition-all duration-700">
        
        {/* Right (image) */}
        <div className="relative md:w-1/2 w-full h-[300px] md:h-[420px] overflow-hidden">
          <img
            src={showcases[index].img}
            alt="Seller Showcase"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Left (logo + text + buttons) */}
        <div className="flex flex-col justify-center items-start p-10 bg-[#FFF9F3] md:w-1/2 text-left transition-opacity duration-700">
          {/* Logo above text */}
          <div className="flex justify-start mb-6">
            <img
              src={logo}
              alt="CraftMaven Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Quote */}
          <p
            className={`text-2xl md:text-3xl font-semibold italic text-gray-800 mb-6 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            “{showcases[index].quote}”
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-[#F2C94C] text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
              Start Selling
            </button>
            <button className="border border-[#F2C94C] text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-100 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
