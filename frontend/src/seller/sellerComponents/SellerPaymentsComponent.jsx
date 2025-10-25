import React from "react";
import img from "../../assets/SellerPayments2.png"

export function SellerPaymentsComponent() {
  return (
    <div className="bg-[#FFF7EE] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Card Container */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
          
          {/* Left Text Section */}
          <div className="md:w-3/5 w-full p-8 text-gray-800">
            <h1 className="text-3xl font-bold text-[#C45A28] mb-6">
              Craftmaven Seller Payments & Fees
            </h1>

            {/* Payment Cycle */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Payment Cycle
              </h2>
              <p className="mb-4">
                At <strong>Craftmaven</strong>, we prioritise quick and secure payments for our sellers. 
                Your payment process begins once your product is dispatched, ensuring you get paid faster.
              </p>
              <p className="mb-4">
                The payment cycle starts as soon as your product is picked up, and payments 
                are typically credited to your registered bank account within{" "}
                <strong>7* days</strong>. Fees applicable to your sales are automatically deducted before 
                the transfer, keeping everything transparent and simple.
              </p>
              <p className="text-sm italic">
                *Payment timelines depend on seller tier and order type. You can check your exact payment 
                schedule anytime from your Craftmaven Seller Dashboard.
              </p>
            </section>

            {/* Fulfilment Type */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Fulfilment Type
              </h2>
              <p className="mb-4">
                The fees you pay depend on the type of fulfilment service you choose on{" "}
                <strong>Craftmaven</strong>. We offer two flexible options:
              </p>

              <h3 className="text-xl font-medium mt-4 mb-2 text-[#C45A28]">
                1. Fulfilment by Craftmaven (FBC)
              </h3>
              <p className="mb-4">
                Craftmaven handles packaging, shipping, and delivery — so you can focus on creating. 
                This option offers convenience and reliability with customer-trusted logistics.
              </p>

              <h3 className="text-xl font-medium mt-4 mb-2 text-[#C45A28]">
                2. Non-Fulfilment by Craftmaven (NFBC)
              </h3>
              <p>
                You handle packaging and delivery yourself. Ideal for sellers who want 
                complete control over logistics and inventory management.
              </p>

              <p className="mt-4">
                <strong>Note:</strong> Fees differ depending on your chosen fulfilment method. 
                Check your Seller Dashboard for details.
              </p>
            </section>

            {/* Fee Type */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Fee Types
              </h2>
              <p className="mb-4">
                Craftmaven’s fee structure is transparent and designed to keep your business 
                profitable. Fees depend on product category, fulfilment type, and order value. 
                Below are the main fee types applicable:
              </p>

              <h3 className="text-xl font-medium mt-6 mb-2 text-[#C45A28]">
                1. Fixed Fee (Platform Opportunity)
              </h3>
              <p className="mb-4">
                Also known as the <strong>closing fee</strong>, this charge depends on your 
                <strong> seller tier </strong> and fulfilment choice. These fees help us improve 
                platform services, tools, and innovations for all sellers.
              </p>
              <p className="font-semibold mt-4 mb-2">Fixed Fee by Tier:</p>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-[#C45A28] text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">Tier</th>
                      <th className="py-2 px-4 text-left">Non-FBC</th>
                      <th className="py-2 px-4 text-left">FBC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Platinum</td>
                      <td className="border px-4 py-2">₹63</td>
                      <td className="border px-4 py-2">₹55</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Gold</td>
                      <td className="border px-4 py-2">₹65</td>
                      <td className="border px-4 py-2">₹57</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Silver</td>
                      <td className="border px-4 py-2">₹69</td>
                      <td className="border px-4 py-2">₹61</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Bronze</td>
                      <td className="border px-4 py-2">₹69</td>
                      <td className="border px-4 py-2">₹61</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm italic">
                *These are standard rates and may vary by category. Refer to your seller 
                dashboard for the most accurate and updated rates.
              </p>

              <h3 className="text-xl font-medium mt-8 mb-2 text-[#C45A28]">
                2. Commission Fee (Category)
              </h3>
              <p className="mb-4">
                A percentage-based fee depending on your product category. It’s applied to 
                the final selling price and remains consistent across FBC and NFBC orders.
              </p>
              <p>
                To check the applicable rate for your category, visit your Seller Dashboard 
                under <strong>“Fees & Commissions.”</strong>
              </p>
            </section>

            {/* Shipping Fees */}
            <section>
              <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
                Shipping Fees
              </h2>
              <p className="mb-4">
                Craftmaven calculates shipping based on the higher of actual or volumetric weight. 
                Products under 500g are shipped free for local & zonal deliveries.
              </p>

              <p className="mb-4">
                <strong>Volumetric Weight (kg)</strong> = (Length × Breadth × Height) / 5000
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-[#C45A28] text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">Details</th>
                      <th className="py-2 px-4 text-left">Local</th>
                      <th className="py-2 px-4 text-left">Zonal</th>
                      <th className="py-2 px-4 text-left">National</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">0 - 500 g</td>
                      <td className="border px-4 py-2">Free</td>
                      <td className="border px-4 py-2">Free</td>
                      <td className="border px-4 py-2">₹16</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Each +500g (upto 1kg)</td>
                      <td className="border px-4 py-2">₹5</td>
                      <td className="border px-4 py-2">₹20</td>
                      <td className="border px-4 py-2">₹25</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">+1kg to 1.5kg</td>
                      <td className="border px-4 py-2">₹20</td>
                      <td className="border px-4 py-2">₹20</td>
                      <td className="border px-4 py-2">₹30</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">+3kg to 12kg (per kg)</td>
                      <td className="border px-4 py-2">₹8</td>
                      <td className="border px-4 py-2">₹12</td>
                      <td className="border px-4 py-2">₹18</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-sm italic">
                *Local: within city | Zonal: within same region | National: across regions
              </p>
            </section>
          </div>

          {/* Right Image Section */}
          <div className="md:w-2/5 w-full">
            <img
              src={img}
              alt="Craftmaven Seller Payments"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
