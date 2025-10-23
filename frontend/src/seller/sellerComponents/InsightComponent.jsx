export function InsightComponent() {
  return (
    <div className="bg-craft-light-bg text-gray-700 pt-24 px-6 md:px-16 space-y-6 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold">
        <span className="text-craft-dark-green">Craft</span>
        <span className="text-craft-terracotta">Maven</span> Seller Insights & Tools
      </h1>

      {/* Intro */}
      <p>
        The <span className="font-semibold text-craft-dark-green">Craft</span>
        <span className="font-semibold text-craft-terracotta">Maven</span> Seller Dashboard is designed to help artisans grow their business. 
        Access valuable tools and insights to make smarter decisions, manage your store efficiently, and reach more buyers.
      </p>

      {/* Sections */}
      <h2 className="text-2xl font-semibold text-craft-dark-green">1. Price Recommendations Tool</h2>
      <p>
        Pricing your handmade products can be tricky. With CraftMaven's Price Recommendation Tool, 
        get data-driven insights to set the right price that balances competitiveness and profit.
      </p>

      <h2 className="text-2xl font-semibold text-craft-dark-green">2. Selection Insights</h2>
      <p>
        Learn what your buyers love! CraftMaven's Selection Insights provides trends on popular products, 
        search patterns, and customer preferences to help you stock and promote the right items.
      </p>

      <h2 className="text-2xl font-semibold text-craft-dark-green">3. Inventory Health</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Monitor stock levels and avoid shortages.</li>
        <li>Make data-driven restocking decisions.</li>
        <li>Keep your supply chain smooth and efficient.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-craft-dark-green">4. Promote Your Products</h2>
      <p>
        CraftMaven Promotions help you showcase your creations to thousands of buyers daily. 
        Increase visibility, boost sales, and expand your audience.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Higher Visibility:</strong> Appear in top search results and curated collections.</li>
        <li><strong>Actionable Insights:</strong> Track performance and optimize campaigns effectively.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-craft-dark-green">5. Value Services</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Account Management:</strong> Personalized guidance from CraftMaven experts to grow your store.</li>
        <li><strong>Premium Catalogue Services:</strong> Professional photos, 360° videos, AR, and rich product descriptions.</li>
        <li><strong>Ignite Program:</strong> Kickstart your selling journey with training, resources, and promotional support.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-craft-dark-green">6. CraftMaven Shopping Festivals</h2>
      <p>
        Participate in seasonal CraftMaven sales like <span className="font-semibold text-craft-dark-green">Handmade Week</span> and <span className="font-semibold text-craft-terracotta">Festive Crafts Sale</span> 
        to reach more buyers and boost your sales during high-traffic periods.
      </p>

      <h2 className="text-2xl font-semibold text-craft-dark-green">7. Partner Services</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Packaging and shipping solutions</li>
        <li>Artisan sourcing support</li>
        <li>Accounting & taxation services</li>
        <li>Imaging & product photography</li>
        <li>Store reinstatement support</li>
      </ul>
    </div>
  )
}
