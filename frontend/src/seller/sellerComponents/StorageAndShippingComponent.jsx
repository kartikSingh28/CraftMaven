import React from "react";
import packing1 from "../../assets/Storage&Shipping2.png";
import packing2 from "../../assets/Shipping4.png";

export function StorageAndShippingComponent() {
  return (
    <section className="min-h-screen bg-[#FFF8F2] flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-12 gap-10">
      
      {/* LEFT CONTENT */}
      <div className="flex-1 max-w-2xl space-y-10">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-extrabold text-[#4B2E05]">
            📦 Storage & Shipping
          </h2>
          <p className="text-gray-700 mt-3 text-lg leading-relaxed">
            Congratulations on receiving your first order!{" "}
            <span className="font-semibold text-[#4B2E05]">CraftMaven</span> ensures your handmade treasures reach customers securely and on time.  
            Choose from two easy fulfilment options tailored for your creative business.
          </p>
        </div>

        {/* FULFILMENT OPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CraftMaven Managed (CMF) */}
          <div className="bg-white border border-[#EAD9C2] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-[#4B2E05] mb-3">
              CraftMaven Managed (CMF)
            </h3>
            <ul className="text-gray-700 text-sm space-y-2 list-disc pl-5">
              <li>Secure storage in CraftMaven hubs</li>
              <li>Eco-friendly packaging</li>
              <li>Tracked shipping & faster delivery</li>
              <li>Returns handled by CraftMaven</li>
              <li>Earn “CraftMaven Fulfilled” badge</li>
            </ul>
          </div>

          {/* Self Managed (SMF) */}
          <div className="bg-white border border-[#EAD9C2] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-[#4B2E05] mb-3">
              Self-Managed (SMF)
            </h3>
            <ul className="text-gray-700 text-sm space-y-2 list-disc pl-5">
              <li>Full control over packing & presentation</li>
              <li>Store at your own or shared space</li>
              <li>Schedule pickups via partners</li>
              <li>Standard shipping charges apply</li>
              <li>Customer returns supported</li>
            </ul>
          </div>
        </div>

        {/* QUICK INSIGHTS (Centered, Bigger) */}
        <div className="bg-[#FAEFE3] border border-[#EAD9C2] rounded-3xl shadow-lg p-8 mt-8 flex flex-col lg:flex-row items-center justify-between gap-8 hover:shadow-xl transition-all">
          
          {/* Text Block */}
          <div className="flex-1">
            <h4 className="text-3xl font-bold text-[#4B2E05] mb-4">
              🔍 Quick Insights
            </h4>
            <p className="text-gray-700 text-base leading-relaxed">
              ⚙️ <span className="font-medium">CraftMaven Managed (CMF)</span> is ideal if you prefer a hands-free experience — storage, packing, shipping, and returns are all handled for you.  
              <br />
              🎨 <span className="font-medium">Self-Managed (SMF)</span> gives you creative control over how your products are presented and packed while still enjoying reliable logistics through CraftMaven’s network.
            </p>
          </div>

          {/* Image Right */}
          <div className="w-full lg:w-[40%]">
            <img
              src={packing2}
              alt="Packaging insights"
              className="rounded-2xl shadow-md border-4 border-white w-full h-52 md:h-60 object-cover hover:scale-[1.03] transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* RIGHT MAIN IMAGE */}
      <div className="w-full lg:w-[40%]">
        <img
          src={packing1}
          alt="CraftMaven warehouse"
          className="rounded-3xl shadow-xl border-4 border-white w-full h-72 md:h-[420px] object-cover hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
    </section>
  );
}
