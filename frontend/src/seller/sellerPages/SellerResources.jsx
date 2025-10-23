import { FaqCardComponent } from "../sellerComponents/faqCard1";
import { SellerNavbar } from "../SellerNavbar";
import { SellerFooter } from "../SellerFooter";
import resImg from "../../assets/SellerResources.png";
import resImg2 from "../../assets/SellerResources2.png";
import resImg3 from "../../assets/SellerResources3.png";
import {SellerResourcesComponent} from "../sellerComponents/SellerResourcesComponent";

import {
  FilePlus,
  List,
  ShoppingBag,
  Truck,
  Banknote,
  Users,
  CreditCard,
  TrendingUp,
  Headphones,
} from "lucide-react";

export function SellerResources() {
  const Res = [
    {
      icon: <Users className="w-12 h-12 text-[#C65A2E]" />,
      title: "45K+ Buyers",
      description:
        "Access thousands of art lovers and handmade product enthusiasts daily, ready to explore your creations.",
    },
    {
      icon: <CreditCard className="w-12 h-12 text-[#C65A2E]" />,
      title: "Fast & Secure Payments",
      description:
        "Receive your earnings quickly and safely, directly to your bank account without any delays.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-[#C65A2E]" />,
      title: "Boost Your Sales",
      description:
        "Leverage marketing campaigns, seasonal promotions, and data-driven insights to increase visibility and sales.",
    },
    {
      icon: <Headphones className="w-12 h-12 text-[#C65A2E]" />,
      title: "Dedicated Support",
      description:
        "Get expert assistance anytime with our responsive seller support team to help you grow efficiently.",
    },
  ];

  const Res2 = [
  {
    icon: <Users className="w-10 h-10 text-[#C65A2E]" />,
    title: "Opportunity",
    description:
      "Reach thousands of buyers daily and gain access to shopping festivals to grow your business.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-[#C65A2E]" />,
    title: "Ease of Selling",
    description:
      "Set up your CraftMaven seller account in minutes with minimal requirements and start selling quickly.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-[#C65A2E]" />,
    title: "Growth",
    description:
      "Boost visibility, leverage marketing campaigns, and track performance to maximize sales.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-[#C65A2E]" />,
    title: "Additional Support",
    description:
      "Get account management, training programs, business insights, and product photography support.",
  },
];


const Res3 = [
  {
    icon: <FilePlus className="w-10 h-10 text-[#C65A2E]" />,
    title: "Create",
    description:
      "Register in just 10 mins with valid GST, address, & bank details.",
  },
  {
    icon: <List className="w-10 h-10 text-[#C65A2E]" />,
    title: "List",
    description:
      "List your products (min 1 no.) that you want to sell on our platform.",
  },
  {
    icon: <ShoppingBag className="w-10 h-10 text-[#C65A2E]" />,
    title: "Orders",
    description:
      "Receive orders from millions of customers across India.",
  },
  {
    icon: <Truck className="w-10 h-10 text-[#C65A2E]" />,
    title: "Shipment",
    description:
      "We ensure stress-free and reliable delivery of your products.",
  },
  {
    icon: <Banknote className="w-10 h-10 text-[#C65A2E]" />,
    title: "Payment",
    description:
      "Receive payment within 7 days* from the date of product dispatch.",
  },
];

  return (
    <>
      <SellerNavbar />
      <FaqCardComponent
        title="Become a CraftMaven Seller and sell to 45K+ customers"
        image={resImg}
        steps={Res}
      />


      <FaqCardComponent 
        title="Why do Sellers Love Selling on CraftMaven"
        subtitle="45k+ customers across India trust CraftMaven.com to
        be their number 1 online Shopping destination when it comes to
        Handicrafts and HandMade Goods" 
        image={resImg2}
        steps={Res2} 
        />

        <FaqCardComponent 
         title="Your Journey on CraftMaven"
         subtitle="Starting your online business with CraftMaven is easy.  45 thousand+ sellers trust CraftMaven with their business"
         image={resImg3}
         steps={Res3}
         />

         <SellerResourcesComponent />
      <SellerFooter />
    </>
  );
}
