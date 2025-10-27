import React from "react";
import { SellerNavbar } from "../SellerNavbar";
import { SellerFooter } from "../SellerFooter";
import { FaqCardComponent } from "../sellerComponents/faqCard1";
import { ReceivePaymentsComponent } from "../sellerComponents/ReceivePaymentsComponent";
import paymentsImg from "../../assets/ReceivePayments2.png";
import { Wallet, ShieldCheck, Clock, Banknote } from "lucide-react";

export function ReceivePayments() {
  const steps = [
    {
      icon: <Wallet className="w-6 h-6 text-[#C45A28]" />,
      title: "Easy Setup",
      description:
        "Register your bank details once — payments are auto-processed for every order.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C45A28]" />,
      title: "Timely Payouts",
      description:
        "Get payments within 7 days* of dispatch to maintain a smooth cash flow.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C45A28]" />,
      title: "Secure Transfers",
      description:
        "CraftMaven ensures your transactions are safe and verified before crediting.",
    },
    {
      icon: <Banknote className="w-6 h-6 text-[#C45A28]" />,
      title: "Transparent Fees",
      description:
        "No hidden deductions — check your commissions upfront in the seller dashboard.",
    },
  ];

  return (
    <>
      <SellerNavbar />

      {/* Hero / Info Card Section */}
      <div className="transform scale-[1.04] origin-center transition-transform duration-500 ease-in-out">
        <FaqCardComponent
          title="Receive Payments Seamlessly"
          subtitle="CraftMaven ensures fast, secure, and transparent payments directly to your bank account — empowering Indian artisans to grow confidently."
          image={paymentsImg}
          steps={steps}
        />
      </div>

      {/* Detailed Payment Info Section */}
      <ReceivePaymentsComponent />

      <SellerFooter />
    </>
  );
}
