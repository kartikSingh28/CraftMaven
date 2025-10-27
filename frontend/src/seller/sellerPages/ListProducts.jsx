import { SellerNavbar } from "../SellerNavbar";
import { SellerFooter } from "../SellerFooter";
import { FaqCardComponent } from "../sellerComponents/faqCard1";
import {ListProductsComponent} from "../sellerComponents/ListProductComponent";
import img from "../../assets/ListingProducts.png";
import {
  FileText,
  Ruler,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";

export function ListProducts() {
  const listingSteps = [
    {
      title: "Step 1: Add Product Details",
      description:
        "Enter your product title, category, description, materials, and price. High-quality photos attract more buyers!",
      icon: <FileText className="w-8 h-8 text-[#C45A28]" />,
    },
    {
      title: "Step 2: Add Dimensions & Features",
      description:
        "Provide size, color, and material information to help buyers understand your craft better.",
      icon: <Ruler className="w-8 h-8 text-[#C45A28]" />,
    },
    {
      title: "Step 3: Upload Images",
      description:
        "Add clear, natural-light images showing your product from multiple angles. Highlight its craftsmanship.",
      icon: <ImageIcon className="w-8 h-8 text-[#C45A28]" />,
    },
    {
      title: "Step 4: Review & Publish",
      description:
        "Double-check your details and click 'Publish'. Your product will now be visible on CraftMaven’s marketplace.",
      icon: <CheckCircle className="w-8 h-8 text-[#C45A28]" />,
    },
  ];

  return (
    <>
      <SellerNavbar />
      <div className="bg-[#FFF7EE] py-16">
         <div className="transform scale-[1.08] origin-center">
           <FaqCardComponent
               title="Welcome to Your Product Listing Journey"
               subtitle="Create beautiful, detailed listings that showcase your handmade creations and connect with customers who value authenticity."
               image={img}
                steps={listingSteps}
            />
         </div>

        <ListProductsComponent />
      </div>
      <SellerFooter />
    </>
  );
}
