import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO.png";

export function NavBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#F7F3EC] px-10 py-4 shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="CraftMaven Logo" className="w-16 h-16 object-contain" />
        <span className="text-2xl font-bold text-[#1B4D4A] tracking-wide">
          Craft<span className="text-[#C65A2E]">Maven</span>
        </span>
      </Link>

      {/* Search */}
      <div className="flex-1 mx-10 max-w-xl">
        <input
          type="text"
          placeholder="Search Products..."
          className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B4D4A]"
        />
      </div>

      {/* Menu */}
      <div className="flex gap-6 items-center text-[#1B4D4A] font-medium relative">
        {/* Login dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-3 py-1 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setLoginOpen(!loginOpen)}
          >
            Login
          </button>

          {loginOpen && (
            <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <li>
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-[#1B4D4A] hover:bg-[#C65A2E] hover:text-white transition"
                  onClick={() => setLoginOpen(false)}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-[#1B4D4A] hover:bg-[#C65A2E] hover:text-white transition"
                  onClick={() => setLoginOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>

        <Link
          to="/cart"
          className="px-3 py-1 rounded hover:bg-[#C65A2E] hover:text-white transition"
        >
          Cart
        </Link>
        <Link
          to="/seller"
          className="bg-[#1B4D4A] text-white px-4 py-2 rounded-full hover:bg-[#14503F] transition"
        >
          Become a Seller
        </Link>
      </div>
    </nav>
  );
}
