import { CheckCircle, Store, Package, TrendingUp } from "lucide-react";

export function SellerInfo() {
  const steps = [
    {
      icon: <Store className="w-10 h-10 text-[#C45A28]" />,
      title: "1. Create Your Account",
      description:
        "Sign up with your email and GST details to start your journey as a CraftMaven seller.",
    },
    {
      icon: <Package className="w-10 h-10 text-[#C45A28]" />,
      title: "2. List Your Products",
      description:
        "Upload beautiful images and set prices. Our tools make showcasing your work simple.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#C45A28]" />,
      title: "3. Grow Your Business",
      description:
        "Reach thousands of buyers and get insights to boost your visibility and sales.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-[#C45A28]" />,
      title: "4. Get Paid Securely",
      description:
        "Enjoy timely payments directly in your bank account with complete transparency.",
    },
  ];

  return (
    <section className="bg-[#FFF9F0] py-20 px-6 md:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#184C3A] mb-3">
          Start Selling in Just a Few Steps
        </h2>
        <p className="text-[#3E5C50] text-lg max-w-2xl mx-auto">
          Join CraftMaven’s growing community of artisans and turn your craft into a thriving business.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-8 text-center border-t-4 border-[#C45A28] hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#184C3A] mb-2">
              {step.title}
            </h3>
            <p className="text-[#3E5C50] text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
