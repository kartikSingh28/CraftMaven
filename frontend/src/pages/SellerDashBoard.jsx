import React from "react";
import { SellerNavbar } from "../seller/SellerNavbar";
import { SellerHeroSection } from "../seller/SellerHeroSection";
import { SellerFooter } from "../seller/SellerFooter";
import { SellerInfo } from "../seller/SellerInfo";

export function SellerDashBoard() {
  // runtime validation for missing components (helps identify import/export mismatches)
  const components = { SellerNavbar, SellerHeroSection, SellerInfo, SellerFooter };
  const missing = Object.entries(components).filter(([_, comp]) => !comp).map(([name]) => name);
  if (missing.length) {
    console.error("SellerDashBoard: missing components:", missing);
    return (
      <div style={{ padding: 24, fontFamily: "sans-serif", color: "#111", background: "#fff" }}>
        <h2 style={{ marginBottom: 12 }}>Dashboard failed to load</h2>
        <p style={{ marginBottom: 8 }}>
          One or more seller components did not load. Check console for details.
        </p>
        <ul>
          {missing.map((m) => (
            <li key={m} style={{ color: "#b00" }}>
              {m} is undefined — check import/export
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 12, fontSize: 13, color: "#555" }}>
          Common fixes: confirm files exist, ensure "export default" vs "export { Name }" matches how you import.
        </p>
      </div>
    );
  }

  // Fallback inline styles keep the UI readable even if external CSS/Tailwind isn't loaded.
  return (
    <div style={{ fontFamily: "sans-serif", color: "#111" }}>
      <SellerNavbar />
      <SellerHeroSection />
      <SellerInfo />
      <SellerFooter />
    </div>
  );
}

// also export default to prevent import style mismatches
export default SellerDashBoard;
