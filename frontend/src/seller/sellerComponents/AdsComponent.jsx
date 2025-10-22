export function AdsComponent() {
  return (
    // Outer div for the full-width background color
    // This div covers the entire viewport width.
    <div className="bg-[#FFF7EE]">
      
      {/* Inner div to center the content and apply max width */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
        
        <h1 className="text-3xl font-bold text-[#C45A28] mb-6">
          CraftMaven Ads — Advertising Guide for Local Craftsmen & Artisans
        </h1>

        <p className="mb-8 text-lg">
          <strong>CraftMaven Ads</strong> is a marketing tool inside CraftMaven that helps local
          craftsmen and artisans showcase their work to buyers who value handmade, local, and
          unique products. Use it to increase visibility, boost sales, and build a loyal following.
        </p>

        <h2 className="text-2xl font-semibold text-[#C45A28] mt-10 mb-4">
          Why Use CraftMaven Ads
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Higher local visibility — reach buyers searching for handmade and local crafts.</li>
          <li>Targeted discovery — reach customers by category, location, occasion, or interest.</li>
          <li>Actionable insights — track clicks, add-to-carts, and conversions easily.</li>
          <li>Cost control — choose between visibility-focused (CPC) or ROI-based campaigns.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#C45A28] mt-10 mb-4">
          Ad Campaign Types
        </h2>

        <h3 className="text-xl font-medium mt-6 mb-2">1. Pay-Per-Click (PPC) — Product Boost</h3>
        <p>
          Best when you want maximum visibility quickly. You pay only when someone clicks your ad.
        </p>
        <p className="mt-2 font-semibold">Use it for:</p>
        <ul className="list-disc pl-6">
          <li>New product launches.</li>
          <li>Seasonal items (Diwali, weddings, local festivals).</li>
          <li>High-potential listings you want to accelerate.</li>
        </ul>
        <p className="mt-2"><strong>Benefits:</strong> Fast visibility lift and impressions.</p>
        <p><strong>Trade-off:</strong> Monitor cost-per-click to manage spend vs sales.</p>

        <h3 className="text-xl font-medium mt-6 mb-2">
          2. Smart ROI — Conversion-Focused Campaign
        </h3>
        <p>
          Goal: maximise sales value for each rupee spent. The system optimises bids to drive
          purchases, not just clicks.
        </p>
        <p className="mt-2 font-semibold">Use it for:</p>
        <ul className="list-disc pl-6">
          <li>Low-margin items that need efficient spending.</li>
          <li>Listings with strong product pages & reviews.</li>
          <li>Smaller budgets requiring predictable returns.</li>
        </ul>
        <p className="mt-2"><strong>Benefits:</strong> Better efficiency, lower wasted clicks.</p>
        <p><strong>Trade-off:</strong> Less visibility, prioritises conversions.</p>

        <h3 className="text-xl font-medium mt-6 mb-2">
          3. Local Spotlight — Geo + Occasion Targeting
        </h3>
        <p>
          Specialized campaigns that push your products to nearby buyers or event-driven demand.
        </p>
        <p className="mt-2 font-semibold">Use it for:</p>
        <ul className="list-disc pl-6">
          <li>Artisans selling large or fragile pieces locally.</li>
          <li>Promotions at craft fairs, pop-ups, or local pickups.</li>
          <li>Festival or wedding-season targeting within a region.</li>
        </ul>
        <p className="mt-2"><strong>Benefits:</strong> Lower shipping friction and more repeat customers.</p>
      </div>
    </div>
  );
}