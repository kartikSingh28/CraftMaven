import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { SellerDashBoard } from "./pages/SellerDashBoard";
import { Footer } from "./components/Footer";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { SellerFaq } from "./seller/sellerPages/sellerFaq";
import {Policy} from "./seller/sellerPages/Policy";
import {SellerAds} from "./seller/sellerPages/SellerAds";
import {InsightsAndTools} from "./seller/sellerPages/InsightsAndTools";
import {SellerResources} from "./seller/sellerPages/SellerResources";
import {ValueAddedServices} from "./seller/sellerPages/ValueAddedServices";
import {SellerPayments} from "./seller/sellerPages/SellerPayments";
import { StorageAndShipping } from "./seller/sellerPages/StorageAndShipping";
import {GrowFaster} from "./seller/sellerPages/GrowFaster";

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
        <Route path="/Policies" element={<Policy />} />
        <Route path="/craftmaven-ads" element={<SellerAds />} />
        <Route path="/insights-tools" element={<InsightsAndTools />} />
        <Route path="/resources" element ={<SellerResources />} />
        <Route path="/vas" element ={<ValueAddedServices />} />
        <Route path="/payments-info" element ={<SellerPayments />} />
        <Route path="/storage-shipping" element={<StorageAndShipping />} />
        <Route path="/grow-faster" element={<GrowFaster />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
