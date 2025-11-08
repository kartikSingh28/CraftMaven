import { SellerNavbar } from "../SellerNavbar";
import { SellerFooter } from "../SellerFooter";
import { FaqCardComponent } from "../sellerComponents/faqCard1";
import {GrossMarginComponent} from "../sellerComponents/GrossMarginComponent";
import grossMarginImg from "../../assets/GrossMargin.png"; 
import { Calculator, Truck, Percent, Scale } from "lucide-react";

export function GrossMargin() {
  const steps = [
    {
      icon: <Truck className="w-10 h-10 text-[#C45A28]" />,
      title: "Step 1: Calculate Shipping Fees",
      description: `For example, shipping a product from Ludhiana to Bengaluru (national shipping) with a packed weight of 400g costs ₹16.`,
    },
    {
      icon: <Percent className="w-10 h-10 text-[#C45A28]" />,
      title: "Step 2: Calculate Commission Fees",
      description: `Apply the category-specific commission. For a ₹450 product, a 4.5% commission equals ₹20.25.`,
    },
    {
      icon: <Scale className="w-10 h-10 text-[#C45A28]" />,
      title: "Step 3: Calculate Fixed Fees",
      description: `As a Gold Tier seller using Fulfillment by CraftMaven, the fixed fee is ₹57.`,
    },
    {
      icon: <Calculator className="w-10 h-10 text-[#C45A28]" />,
      title: "Step 4: Determine Total Fees & Gross Margin",
      description: `Total Fees = ₹16 + ₹20.25 + ₹57 = ₹93.25  
Gross Margin = Selling Price ₹450 - ₹93.25 = ₹356.75`,
    },
  ];

  return (
    <>
      <SellerNavbar />
      <FaqCardComponent
        title="How to Calculate Your Gross Margin?"
        subtitle="Understand your costs and profits using CraftMaven fee breakdown model"
        image={grossMarginImg}
        steps={steps}
      />
      
      <GrossMarginComponent />
      <SellerFooter />
    </>
  );
}
