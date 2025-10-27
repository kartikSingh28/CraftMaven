import React from "react";
import { motion } from "framer-motion";
import growthImage from "../../assets/growth2.png"; // You can replace this with your uploaded image

export function GrowFasterComponent() {
  return (
    <section className="bg-[#FFF7EE] py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Text Content */}
        <motion.div
          className="md:w-1/2 text-gray-800"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#C45A28] mb-6">
            Grow Your Craft Business Faster on CraftMaven
          </h2>
          <p className="text-lg mb-4">
            Whether you’re a seasoned artisan or just starting your creative journey, 
            <strong> CraftMaven </strong> helps your business reach new heights. 
            With powerful seller tools, transparent payments, and customer trust, 
            you can focus on what truly matters — your craft.
          </p>

          <div className="space-y-6 mt-8">
            <div className="flex items-start gap-3">
              <span className="text-[#C45A28] text-xl font-semibold">1.</span>
              <div>
                <h3 className="font-semibold text-lg text-[#C45A28]">
                  Smart Growth Tools
                </h3>
                <p>
                  Get access to insights that help you understand your customers, 
                  improve listings, and maximize visibility across the platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[#C45A28] text-xl font-semibold">2.</span>
              <div>
                <h3 className="font-semibold text-lg text-[#C45A28]">
                  Hassle-Free Logistics
                </h3>
                <p>
                  Choose <strong>Fulfilment by CraftMaven</strong> (FBC) and let us handle packaging and delivery,
                  ensuring your customers receive your products safely and on time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-[#C45A28] text-xl font-semibold">3.</span>
              <div>
                <h3 className="font-semibold text-lg text-[#C45A28]">
                  Transparent Payments
                </h3>
                <p>
                  Enjoy clear, timely payments with zero hidden charges. 
                  Every transaction is tracked from your <strong>Seller Dashboard</strong>.
                </p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 px-8 py-3 bg-[#C45A28] text-white font-semibold rounded-xl shadow-md hover:bg-[#a94c21] transition-colors"
          >
            Start Selling Today
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src={growthImage}
            alt="Grow faster with CraftMaven"
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg border-4 border-white"
          />
        </motion.div>
      </div>
    </section>
  );
}
