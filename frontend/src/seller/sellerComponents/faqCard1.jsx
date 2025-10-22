

import React from "react";

export function FaqCardComponent({ title, subtitle, image, steps }) {
  return (
    <section className="bg-[#FFF9F0] py-20 px-6 md:px-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

        {/* LEFT: Text and Cards */}
        <div className="flex-1 w-full">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-[#184C3A] mb-3">{title}</h2>
            <p className="text-[#3E5C50] text-lg max-w-2xl mx-auto lg:mx-0">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {steps &&
              steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl p-8 text-center border-t-4 border-[#C45A28] hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-[#184C3A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#3E5C50] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt="FAQ visual"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
