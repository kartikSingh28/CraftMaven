import {FaqCardComponent} from "../sellerComponents/faqCard1";
import {SellerNavbar} from "../SellerNavbar";
import {SellerFooter} from "../SellerFooter";
import InsightsMdlImg from "../../assets/InsightsAndTools.png";
import {InsightComponent} from "../sellerComponents/InsightComponent";


export function InsightsAndTools(){
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
    return (
        <>
        <SellerNavbar />
        <FaqCardComponent title="SuperCharge your business with industry-leading tools & services "
                image={InsightsMdlImg}
                steps={steps}
        />
        <InsightComponent />
        <SellerFooter />
          
        </>
    )
}