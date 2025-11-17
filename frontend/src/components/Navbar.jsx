// src/components/NavBar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/LOGO.png";

export function NavBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get("q") || "";

  const [searchQ, setSearchQ] = useState(initialQ);
  const [cartCount, setCartCount] = useState(0);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // keep search input in sync when URL changes (e.g., back/forward)
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setSearchQ(p.get("q") || "");
  }, [location.search]);

  // optional: fetch cart count if buyer token exists
  useEffect(() => {
    const token = localStorage.getItem("buyerToken");
    if (!token) return;

    (async () => {
      try {
        const resp = await fetch("/api/v1/buyer/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resp.ok) return;
        const data = await resp.json();
        const count = Array.isArray(data.cart) ? data.cart.reduce((s, it) => s + (it.quantity || 0), 0) : 0;
        setCartCount(count);
      } catch (e) {
        // ignore silently (not critical)
      }
    })();
  }, [location.pathname]);

  // submit search -> navigate to home with query param
  function onSearchSubmit(e) {
    e.preventDefault();
    const p = new URLSearchParams(location.search);
    if (searchQ && searchQ.trim() !== "") p.set("q", searchQ.trim());
    else p.delete("q");
    p.delete("page"); // reset pagination when searching
    navigate(`/?${p.toString()}`);
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-[#F7F3EC] px-6 md:px-10 py-3 shadow-md z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="CraftMaven Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
        <span className="text-lg md:text-2xl font-bold text-[#1B4D4A] tracking-wide">
          Craft<span className="text-[#C65A2E]">Maven</span>
        </span>
      </Link>

      {/* Search (wired) */}
      <form onSubmit={onSearchSubmit} className="flex-1 mx-4 md:mx-10 max-w-xl">
        <div className="relative">
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            type="text"
            placeholder="Search Products..."
            className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B4D4A]"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1 top-1.5 bg-[#1B4D4A] text-white px-3 py-1 rounded-full hover:bg-[#14503F] transition"
          >
            Search
          </button>
        </div>
      </form>

      {/* Menu */}
      <div className="flex gap-4 md:gap-6 items-center text-[#1B4D4A] font-medium relative">
        {/* Login dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-3 py-1 rounded hover:bg-[#C65A2E] hover:text-white transition"
            onClick={() => setLoginOpen((s) => !s)}
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

        <Link to="/cart" className="relative px-3 py-1 rounded hover:bg-[#C65A2E] hover:text-white transition">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/seller"
          className="bg-[#1B4D4A] text-white px-3 md:px-4 py-2 rounded-full hover:bg-[#14503F] transition whitespace-nowrap"
        >
          Become a Seller
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
