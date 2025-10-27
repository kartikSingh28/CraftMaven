import {SellerNavbar} from "../SellerNavbar";
import {SellerFooter} from "../SellerFooter";
import {FaqCardComponent} from "../sellerComponents/faqCard1";
import img from "../../assets/Storage&Shpping.png";
import {StorageAndShippingComponent} from "../sellerComponents/StorageAndShippingComponent";


 import {
  Users,
  Wallet,
  Percent,
  Headphones,
} from "lucide-react";



export function StorageAndShipping() {
    const res = [
  {
    icon: <Users className="w-10 h-10 text-[#C45A28]" />,
    title: "45k+ Craftmaven Customers",
    description:
      "Reach a growing base of authentic handmade product lovers across India.",
  },
  {
    icon: <Wallet className="w-10 h-10 text-[#C45A28]" />,
    title: "7* Days Secure & Regular Payments",
    description:
      "Enjoy fast and reliable payouts for every successful order on Craftmaven.",
  },
  {
    icon: <Percent className="w-10 h-10 text-[#C45A28]" />,
    title: "Low Cost of Doing Business",
    description:
      "Sell more while keeping your operational and advertising costs minimal.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-[#C45A28]" />,
    title: "One-Click Seller Support",
    description:
      "Get instant assistance from our dedicated Craftmaven support team, 24x7.",
  },
];
    return (

        <>
          <SellerNavbar />
          <FaqCardComponent 
             title="Seamless Shipping & Secure Storage"
             subtitle="Ensuring your crafted creations reach customers safely, swiftly, and in perfect condition — with CraftMaven’s trusted logistics care."
             image={img}
             steps={res}
          />
          <StorageAndShippingComponent />
          <SellerFooter />
             
        </>
    )
}