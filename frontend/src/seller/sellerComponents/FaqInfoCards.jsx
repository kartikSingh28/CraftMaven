// File: src/sellerComponents/FaqInfoCards.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export function FaqInfoCards() {
  // Accordion states
  const [generalDrop, setGeneralDrop] = useState(false);
  const [feesDrop, setFeesDrop] = useState(false);
  const [accountDrop, setAccountDrop] = useState(false);
  const [servicesDrop, setServicesDrop] = useState(false);

  // Refs for outside click detection
  const generalRef = useRef(null);
  const feesRef = useRef(null);
  const accountRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (generalRef.current && !generalRef.current.contains(event.target)) setGeneralDrop(false);
      if (feesRef.current && !feesRef.current.contains(event.target)) setFeesDrop(false);
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountDrop(false);
      if (servicesRef.current && !servicesRef.current.contains(event.target)) setServicesDrop(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="bg-[#FFF9F0] py-10 px-4 md:px-20">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#184C3A] mb-2">
            Managing Your CraftMaven Account
          </h2>
          <p className="text-[#3E5C50] text-base">
            Find quick answers to common seller questions.
          </p>
        </div>

        <div className="divide-y divide-[#E8E3DA]">
          {/* General */}
          <div ref={generalRef} className="py-4">
            <button
              onClick={() => setGeneralDrop(!generalDrop)}
              className="flex justify-between w-full items-center text-left focus:outline-none"
            >
              <h3 className="font-semibold text-lg text-[#184C3A]">
                How do I list my handmade products on CraftMaven?
              </h3>
              <FiChevronDown
                className={`text-[#C45A28] text-xl transform transition-transform duration-300 ${
                  generalDrop ? "rotate-180" : ""
                }`}
              />
            </button>
            {generalDrop && (
              <div className="mt-3 text-[#3E5C50] text-sm leading-relaxed space-y-1">
                <ul className="list-disc list-inside">
                  <li>Go to your Seller Dashboard and click “Add New Product”.</li>
                  <li>Choose the right category.</li>
                  <li>Upload images and details like size, material, price.</li>
                  <li>Save and publish your product.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Fees */}
          <div ref={feesRef} className="py-4">
            <button
              onClick={() => setFeesDrop(!feesDrop)}
              className="flex justify-between w-full items-center text-left focus:outline-none"
            >
              <h3 className="font-semibold text-lg text-[#184C3A]">
                How can I manage my orders on CraftMaven?
              </h3>
              <FiChevronDown
                className={`text-[#C45A28] text-xl transform transition-transform duration-300 ${
                  feesDrop ? "rotate-180" : ""
                }`}
              />
            </button>
            {feesDrop && (
              <div className="mt-3 text-[#3E5C50] text-sm leading-relaxed">
                <p>
                  Manage all your orders directly from your Seller Dashboard. Track shipments and update statuses.
                </p>
              </div>
            )}
          </div>

          {/* Account */}
          <div ref={accountRef} className="py-4">
            <button
              onClick={() => setAccountDrop(!accountDrop)}
              className="flex justify-between w-full items-center text-left focus:outline-none"
            >
              <h3 className="font-semibold text-lg text-[#184C3A]">
                What do I need before listing my crafts?
              </h3>
              <FiChevronDown
                className={`text-[#C45A28] text-xl transform transition-transform duration-300 ${
                  accountDrop ? "rotate-180" : ""
                }`}
              />
            </button>
            {accountDrop && (
              <div className="mt-3 text-[#3E5C50] text-sm leading-relaxed space-y-1">
                <ul className="list-disc list-inside">
                  <li>Verified seller account</li>
                  <li>Bank details</li>
                  <li>Product photos & descriptions</li>
                  <li>Pricing and stock info</li>
                </ul>
              </div>
            )}
          </div>

          {/* Services */}
          <div ref={servicesRef} className="py-4">
            <button
              onClick={() => setServicesDrop(!servicesDrop)}
              className="flex justify-between w-full items-center text-left focus:outline-none"
            >
              <h3 className="font-semibold text-lg text-[#184C3A]">
                Does CraftMaven offer help with product photos?
              </h3>
              <FiChevronDown
                className={`text-[#C45A28] text-xl transform transition-transform duration-300 ${
                  servicesDrop ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesDrop && (
              <div className="mt-3 text-[#3E5C50] text-sm leading-relaxed">
                <p>Yes! Optional catalogue services include image editing, photography, and description writing.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
