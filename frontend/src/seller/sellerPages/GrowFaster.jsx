import {SellerNavbar} from "../SellerNavbar";
import {SellerFooter} from "../SellerFooter";
import {FaqCardComponent} from "../sellerComponents/faqCard1";
import growImg from "../../assets/growFaster.png";
import growing2 from "../../assets/GrowFaster2.png";
import { GrowFasterComponent} from "../sellerComponents/GrowFasterComponent";

import {
  TrendingUp,
  BarChart2,
  Users,
  Globe2,
  Lightbulb,
   Camera,
  Sparkles,
  Megaphone,
  CalendarDays,
  Wand2
} from "lucide-react";

export function GrowFaster() {
    const growFaqs = [
  {
    icon: <TrendingUp className="w-10 h-10 text-[#C45A28]" />,
    title: "Increase Sales Growth",
    description:
      "Reach more customers with CraftMaven’s growth tools and marketplace visibility.",
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-[#C45A28]" />,
    title: "Access Smart Insights",
    description:
      "Use real-time analytics to track top-selling products and plan inventory smarter.",
  },
  {
    icon: <Users className="w-10 h-10 text-[#C45A28]" />,
    title: "Join Artisan Community",
    description:
      "Collaborate, share experiences, and grow together with other handmade creators.",
  },
  {
    icon: <Globe2 className="w-10 h-10 text-[#C45A28]" />,
    title: "Expand Your Reach",
    description:
      "Showcase your crafts across India and connect with customers who value handmade art.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-[#C45A28]" />,
    title: "Get Personalized Tips",
    description:
      "Receive suggestions to improve listings, pricing, and marketing performance.",
  },
];

const services = [
    {
      icon: <Camera className="w-10 h-10 text-[#C45A28]" />,
      title: "Catalog & Photoshoot Services",
      description:
        "Get professional photos and beautifully styled catalogs that make your crafts stand out to buyers.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-[#C45A28]" />,
      title: "Product Enhancement Tips",
      description:
        "Receive expert advice on how to highlight your products’ best features and attract attention.",
    },
    {
      icon: <CalendarDays className="w-10 h-10 text-[#C45A28]" />,
      title: "Craft Festivals & Sales Events",
      description:
        "Join India’s biggest handmade shopping events and gain massive seasonal visibility.",
    },
    {
      icon: <Megaphone className="w-10 h-10 text-[#C45A28]" />,
      title: "Promotions & Campaigns",
      description:
        "Leverage promotional banners and homepage highlights to boost your brand awareness.",
    },
    {
      icon: <Wand2 className="w-10 h-10 text-[#C45A28]" />,
      title: "Smart Product Recommendations",
      description:
        "Discover trending categories and optimize your listings based on real-time craft demand.",
    },
  ];

    return (
        <>
          <SellerNavbar />
          <FaqCardComponent 
              title="Grow Faster with CraftMaven "
              subtitle="Turn your creativity into a thriving business with the tools and insights you need to succeed."
              image={growImg}
              steps={growFaqs}
            />
            <FaqCardComponent
              title="Showcase Your Craft Like a Pro 🎨"
              subtitle="From high-quality photoshoots to exclusive shopping festivals — elevate your brand presence and attract more buyers on CraftMaven."
              image={growing2}
              steps={services}
            />
            <GrowFasterComponent />
            <SellerFooter />
        </>
    )
}