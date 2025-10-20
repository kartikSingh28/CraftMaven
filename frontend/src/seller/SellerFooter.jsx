import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function SellerFooter() {
  const FooterLink = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Returns", "Shipping Info"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="bg-[#1B4D4A] text-[#F7F3EC] pt-12 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Logo & Description */}
        <div className="col-span-1 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#C65A2E]" />
            <span className="text-3xl font-serif font-extrabold tracking-tight">
              Craft<span className="text-[#C65A2E]">Maven</span>
            </span>
          </div>
          <p className="text-[#D8A24A] text-sm max-w-xs">
            Curating the world's most unique, handcrafted goods from independent artisans.
          </p>
        </div>

        {/* Footer Links */}
        {FooterLink.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="text-lg font-bold mb-3 text-[#C65A2E]">{section.title}</h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-[#F7F3EC]/80 hover:text-[#D8A24A] transition duration-150"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Signup */}
        <div className="col-span-1 md:col-span-1 space-y-3">
          <h4 className="text-lg font-bold mb-3 text-[#C65A2E]">Subscribe</h4>
          <p className="text-sm text-[#D8A24A]">Get updates on new products and offers.</p>
          <form className="flex flex-col sm:flex-row gap-2 mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md text-gray-900 focus:outline-none flex-1"
            />
            <button
              type="submit"
              className="bg-[#C65A2E] hover:bg-[#D8A24A] transition px-4 py-2 rounded-md font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-[#C65A2E]/30 mt-8 px-4">
        <p className="text-[#F7F3EC]/70 text-sm order-2 sm:order-1 mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} CraftMaven, Inc. All rights reserved.
        </p>

        <div className="flex space-x-4 order-1 sm:order-2" aria-label="social links">
          <a href="#" className="text-[#F7F3EC]/70 hover:text-[#C65A2E] transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-[#F7F3EC]/70 hover:text-[#C65A2E] transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-[#F7F3EC]/70 hover:text-[#C65A2E] transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-[#F7F3EC]/70 hover:text-[#C65A2E] transition">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
