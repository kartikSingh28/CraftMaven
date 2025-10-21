import { Users, Wallet, ArrowDownCircle, PhoneCall } from "lucide-react";
import sellerFaqImg from "../../assets/sellerFaq.png";


export function FaqCardComponent() {
  const steps = [
    {
      icon: <Users className="w-10 h-10 text-[#C45A28]" />,
      title: "45K+ CraftMaven Buyers",
      description: "Reach thousands of art enthusiasts and handmade product lovers.",
    },
    {
      icon: <Wallet className="w-10 h-10 text-[#C45A28]" />,
      title: "7 Days Secure Payments",
      description: "Get timely and transparent payments directly in your bank account.",
    },
    {
      icon: <ArrowDownCircle className="w-10 h-10 text-[#C45A28]" />,
      title: "Low Cost of Selling",
      description: "Grow your business with minimal fees and maximum visibility.",
    },
    {
      icon: <PhoneCall className="w-10 h-10 text-[#C45A28]" />,
      title: "One-Click Seller Support",
      description: "Get quick help anytime through our dedicated seller support team.",
    },
  ];

  return (
    <section className="bg-[#FFF9F0] py-20 px-6 md:px-20">
      {/* Container for text + image */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Side - Text + Cards */}
        <div className="flex-1">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-[#184C3A] mb-3">
              FAQ's – Frequently Asked Questions
            </h2>
            <p className="text-[#3E5C50] text-lg max-w-2xl">
              Get your queries quickly answered by our experts.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-2xl p-8 text-center border-t-4 border-[#C45A28] hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-[#184C3A] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#3E5C50] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={sellerFaqImg}
            alt="Seller FAQ illustration"
            className="w-full max-w-md rounded-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}
