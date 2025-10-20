import React from "react";

export default function ShowcaseHeroCardComponent({ img }) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden w-[280px] h-[380px] flex-shrink-0">
      <img src={img} alt="Seller Showcase" className="w-full h-full object-cover" />
    </div>
  );
}
