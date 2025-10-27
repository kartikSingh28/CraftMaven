import React from "react";
import { motion } from "framer-motion";
import { Wallet, Banknote, ArrowRight } from "lucide-react";
import paymentsImg from "../../assets/ReceivePayments.png"; // correct image import

export function ReceivePaymentsComponent() {
  return (
    <section className="bg-[#FFF7EE] py-20 min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        
        {/* Left Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={paymentsImg}
            alt="Receive Payments on CraftMaven"
            className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg border-4 border-white"
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#C45A28] mb-6 flex items-center gap-2">
            <Wallet className="w-7 h-7 text-[#C45A28]" />
            Receive Payments
          </h2>

          <p className="text-lg mb-6 leading-relaxed">
            With a growing community of <strong>craft lovers across India</strong>, you can receive
            orders from customers nationwide. <strong>CraftMaven</strong> ensures
            <strong> timely, secure payments</strong> directly to your registered bank account —
            helping you manage your business effortlessly.
          </p>

          <p className="text-md mb-8">
            Payments are typically credited within <strong>7 days*</strong> from the date of dispatch,
            allowing you to maintain smooth cash flow and focus on growing your handmade business.
          </p>

          <p className="text-sm italic mb-6">
            *Payment timelines may vary depending on your seller tier and fulfillment type.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-[#C45A28] text-white font-semibold rounded-xl shadow-md hover:bg-[#a94c21] flex items-center gap-2 transition-colors"
          >
            <Banknote className="w-5 h-5" />
            Know more about Fees & Commission
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
