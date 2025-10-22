import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";
import { FiChevronDown } from "react-icons/fi";

export function SellerNavbar() {
  // Dropdown states
  const [sellDropdown, setSellDropdown] = useState(false);
  const [feesDropdown, setFeesDropdown] = useState(false);
  const [growDropdown, setGrowDropdown] = useState(false);
  const [learnDropdown, setLearnDropdown] = useState(false);

  // References for detecting clicks outside
  const sellRef = useRef(null);
  const feesRef = useRef(null);
  const growRef = useRef(null);
  const learnRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sellRef.current && !sellRef.current.contains(event.target)) {
        setSellDropdown(false);
      }
      if (feesRef.current && !feesRef.current.contains(event.target)) {
        setFeesDropdown(false);
      }
      if (growRef.current && !growRef.current.contains(event.target)) {
        setGrowDropdown(false);
      }
      if (learnRef.current && !learnRef.current.contains(event.target)) {
        setLearnDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#F7F3EC] px-10 py-4 shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Craft-Maven" className="w-16 h-16 object-contain" />
        <span className="text-2xl font-bold text-[#1B4D4A] tracking-wide">
          Craft<span className="text-[#C65A2E]">Maven</span>
        </span>
      </Link>

      {/* Navbar Options */}
      <div className="flex items-center gap-6 text-[#1B4D4A] font-medium relative">

        {/* Sell Online Dropdown */}
        <div className="relative" ref={sellRef}>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setSellDropdown(!sellDropdown)}
          >
            Sell Online{" "}
            <FiChevronDown
              className={`transition-transform duration-200 ${
                sellDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {sellDropdown && (
            <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg py-2 z-50">
              <Link to="/create-account" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Create Account
              </Link>
              <Link to="/list-products" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                List Products
              </Link>
              <Link to="/grow-faster" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Grow Faster
              </Link>
              <Link to="/receive-payments" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Receive Payments
              </Link>
              <Link to="/storage-shipping" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Storage & Shipping
              </Link>
            </div>
          )}
        </div>

        {/* Fees & Commissions Dropdown */}
        <div className="relative" ref={feesRef}>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setFeesDropdown(!feesDropdown)}
          >
            Fees & Commissions{" "}
            <FiChevronDown
              className={`transition-transform duration-200 ${
                feesDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {feesDropdown && (
            <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg py-2 z-50">
              <Link to="/fees" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Fees
              </Link>
              <Link to="/commissions" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Commissions
              </Link>
              <Link to="/payments-info" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Payments
              </Link>
              <Link to="/other-charges" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Other Charges
              </Link>
            </div>
          )}
        </div>

        {/* Grow Dropdown */}
        <div className="relative" ref={growRef}>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setGrowDropdown(!growDropdown)}
          >
            Grow{" "}
            <FiChevronDown
              className={`transition-transform duration-200 ${
                growDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {growDropdown && (
            <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg py-2 z-50">
              <Link to="/insights-tools" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Insights & Tools
              </Link>
              <Link to="/vas" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Craft Maven Value Added Services
              </Link>
              <Link to="/craftmaven-ads" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                CraftMaven Ads
              </Link>
              <Link to="/service-partners" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Service Partners
              </Link>
            </div>
          )}
        </div>

        {/* Learn Dropdown */}
        <div className="relative" ref={learnRef}>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setLearnDropdown(!learnDropdown)}
          >
            Learn{" "}
            <FiChevronDown
              className={`transition-transform duration-200 ${
                learnDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {learnDropdown && (
            <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg py-2 z-50">
              <Link to="/resources" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Seller Resources
              </Link>
              <Link to="/faqs" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                FAQs
              </Link>
              <Link to="/Policies" className="block px-4 py-2 hover:bg-[#C65A2E] hover:text-white transition">
                Policies
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}