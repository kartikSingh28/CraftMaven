import { SellerNavbar } from "../SellerNavbar";
import { FaqCardComponent } from "../sellerComponents/faqCard1";
import { FaqInfo } from "./FaqInfo";
import FaqImage from "../../assets/sellerFaq.png"; 

const steps = [
  {
    icon: <span className="text-3xl">🧑‍🤝‍🧑</span>,
    title: "45K+ CraftMaven Buyers",
    description: "Reach thousands of art enthusiasts and handmade product lovers.",
  },
  {
    icon: <span className="text-3xl">💳</span>,
    title: "7 Days Secure Payments",
    description: "Get timely and transparent payments directly in your bank account.",
  },
  {
    icon: <span className="text-3xl">⬇️</span>,
    title: "Low Cost of Selling",
    description: "Grow your business with minimal fees and maximum visibility.",
  },
  {
    icon: <span className="text-3xl">📞</span>,
    title: "One-Click Seller Support",
    description: "Get quick help anytime through our dedicated seller support team.",
  },
];

export function SellerFaq() {
  return (
    <>
      <SellerNavbar />
      <FaqCardComponent
        title="FAQ’s – Frequently Asked Questions"
        subtitle="Get your queries quickly answered by our experts."
        image={FaqImage}
        steps={steps}
      />
      <FaqInfo />
    </>
  );
}
