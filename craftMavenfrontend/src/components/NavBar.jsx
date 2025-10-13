import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center bg-white px-10 py-4 shadow-md z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-emerald-700 tracking-wide"
      >
        Craft<span className="text-amber-600">Maven</span>
      </Link>

      {/* Search Box */}
      <div className="flex-1 mx-10 max-w-xl">
        <input
          type="text"
          placeholder="Search Products..."
          className="w-full border border-gray-300 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Menu */}
      <div className="flex gap-6 items-center text-gray-700">
        <Link to="/login" className="hover:text-emerald-600 transition">
          Login
        </Link>
        <Link to="/cart" className="hover:text-emerald-600 transition">
          Cart
        </Link>
        <Link
          to="/seller"
          className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
        >
          Become a Seller
        </Link>
      </div>
    </nav>
  );
}
