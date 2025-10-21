import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SellerDashBoard } from "./pages/SellerDashBoard";
import { Footer } from "./components/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { SellerFaq } from "./seller/sellerPages/sellerFaq";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* This NavBar is for the main user side */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/seller" element={<SellerDashBoard />} />

        {/* Seller-specific FAQ page */}
        <Route path="/faqs" element={<SellerFaq />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
