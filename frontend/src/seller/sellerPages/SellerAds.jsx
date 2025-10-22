import adsImg from "../../assets/Ads3.png";
import { DollarSign, Target, TrendingUp, CheckCircle } from "lucide-react";
import { FaqCardComponent } from "../sellerComponents/faqCard1";
import { SellerNavbar } from "../SellerNavbar";
import {SellerFooter} from "../SellerFooter";
import {AdsComponent} from "../sellerComponents/AdsComponent";

export function SellerAds() {
  const adsFaqs = [
    {
      icon: <Target className="w-10 h-10 text-[#C45A28]" />,
      title: "Boost Product Visibility",
      description:
        "Run PPC or Smart ROI campaigns to reach more craft buyers.",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-[#C45A28]" />,
      title: "Flexible Budget Control",
      description: "Set your ad spend based on your sales goals and ROI.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#C45A28]" />,
      title: "Track Performance",
      description:
        "View ad insights like clicks, conversions, and sales in your dashboard.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#C45A28]" />,
      title: "Guaranteed Transparency",
      description:
        "Every rupee you spend is tracked — pay only for valid clicks or conversions.",
    },
  ];

  return (
    <>
      <SellerNavbar />
      <FaqCardComponent
        title="CraftMaven Ads – Frequently Asked Questions"
        subtitle="Learn how to grow your visibility using CraftMaven Ads."
        image={adsImg}
        steps={adsFaqs}
      />
      <AdsComponent />
      <SellerFooter />
    </>
  );
}
