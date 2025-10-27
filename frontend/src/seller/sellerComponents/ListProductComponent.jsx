import React from "react";
import { motion } from "framer-motion";
import listingImg from "../../assets/ListProducts2.png"; // replace with your image

export function ListProductsComponent() {
  return (
    <section className="bg-[#FFF7EE] py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={listingImg}
            alt="CraftMaven Product Listing"
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg border-4 border-white"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-1/2 text-gray-800"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#C45A28] mb-6">
            List Your Products on CraftMaven
          </h2>

          <p className="text-lg mb-6">
            A <strong>listing</strong> is the process of showcasing your handmade product 
            on <strong>CraftMaven</strong> — making it discoverable to customers and ready for purchase.  
            It’s your product’s digital storefront, complete with title, description, 
            images, pricing, and details that highlight your craftsmanship.
          </p>

          <p className="text-md mb-8 italic bg-white/60 p-4 rounded-xl border-l-4 border-[#C45A28]">
            Did you know? Products with accurate details and high-quality images 
            get up to <strong>15% more visibility</strong> on CraftMaven’s marketplace.
          </p>

          <h3 className="text-2xl font-semibold text-[#C45A28] mb-4">
            Listing on CraftMaven can be done in two simple ways:
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-[#C45A28] mb-2">
                1️⃣ Match with Existing Creations
              </h4>
              <p>
                If a similar product already exists on CraftMaven, 
                you can easily <strong>link your item</strong> to that existing listing.  
                This saves time and helps your product go live faster — 
                while maintaining visibility under a trusted category.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-[#C45A28] mb-2">
                2️⃣ Create a New Listing
              </h4>
              <p>
                For your unique handmade products, simply create a 
                <strong>new listing</strong> by adding rich details — 
                product story, materials, dimensions, features, and beautiful images.  
                This helps customers understand the craft and connect with your art.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 px-8 py-3 bg-[#C45A28] text-white font-semibold rounded-xl shadow-md hover:bg-[#a94c21] transition-colors"
          >
            Start Listing Your Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
