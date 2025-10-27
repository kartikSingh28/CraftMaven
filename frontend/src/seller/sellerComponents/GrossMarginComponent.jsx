import { motion } from "framer-motion";
import { Calculator, Truck, Percent, Wallet, LineChart } from "lucide-react";
import img from "../../assets/grossMarginCalc.png";

export function GrossMarginComponent() {
  return (
    <div className="bg-[#FFF7EE] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-gray-800"
        >
          <h1 className="text-3xl font-bold text-[#C45A28] mb-6">
            How to Calculate Your Gross Margin
          </h1>

          <p className="mb-6">
            Your <strong>CraftMaven Seller Dashboard</strong> provides detailed insights into all applicable fees, helping you understand your business performance and margins clearly.
          </p>

          <div className="space-y-4 mb-10">
            <p>
              <strong>Total CraftMaven Fees</strong> = Fixed Fee + Commission Fee + Shipping Fee (if applicable)
            </p>
            <p>
              <strong>Gross Margin (excluding GST)</strong> = Selling Price of Product − Total CraftMaven Fees
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-[#C45A28] mb-4">
            Example Calculation
          </h2>
          <p className="mb-4">
            You are a <strong>Gold Tier seller</strong> using <strong>Fulfillment by CraftMaven (FBC)</strong>.  
            You sell a handcrafted sari at ₹450.
          </p>

          {/* Step Cards */}
          <div className="space-y-6">
            <Step
              icon={<Truck className="text-[#C45A28]" size={26} />}
              title="Step 1: Shipping Fee"
              text="Product shipped from Ludhiana to Bengaluru (National) with packed weight 400g → Shipping cost ₹16."
            />
            <Step
              icon={<Percent className="text-[#C45A28]" size={26} />}
              title="Step 2: Commission Fee"
              text="4.5% × ₹450 = ₹20.25"
            />
            <Step
              icon={<Wallet className="text-[#C45A28]" size={26} />}
              title="Step 3: Fixed Fee"
              text="Gold Tier (FBC): ₹57"
            />
            <Step
              icon={<Calculator className="text-[#C45A28]" size={26} />}
              title="Step 4: Total Fees"
              text="₹16 + ₹20.25 + ₹57 = ₹93.25"
            />
            <Step
              icon={<LineChart className="text-[#C45A28]" size={26} />}
              title="Step 5: Gross Margin"
              text="Selling Price ₹450 − Fees ₹93.25 = ₹356.75"
            />
          </div>

          <p className="mt-8 text-sm italic text-gray-600">
            *Figures are for illustrative purposes only. Actual fees may vary depending on 
            category, service, and GST. Please check your Seller Dashboard for accurate rates.
          </p>

    
          <div className="max-w-5xl mx-auto px-6 py-8 text-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-[#C45A28]">Note:</h3>
            <p className="text-sm leading-relaxed">
              The figures mentioned above are for illustrative purposes only and are
              intended to provide a general understanding. Actual fees may vary
              based on your chosen services, category, dimensions, and rate card
              updates.
              <br />
              <br />
              For precise and up-to-date fee information, log in to your Flipkart
              seller account. There you can view the exact fees applicable to your
              products and transactions.
            </p>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1"
        >
          <img
            src={img}
            alt="Calculate Gross Margin"
            className="w-full rounded-2xl shadow-md object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

function Step({ icon, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3"
    >
      <div className="p-2 bg-[#FFF0E6] rounded-full">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg text-[#C45A28]">{title}</h3>
        <p className="text-gray-700">{text}</p>
      </div>
    </motion.div>
  );
}
