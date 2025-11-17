import React from "react";
import { SellerNavbar } from "../seller/SellerNavbar";
import { SellerHeroSection } from "../seller/SellerHeroSection";
import { SellerFooter } from "../seller/SellerFooter";
import {SellerInfo} from "../seller/SellerInfo";

export function SellerDashBoard() {
  return (
    <>
      <SellerNavbar />
      <SellerHeroSection />
      <SellerInfo />
      <SellerFooter />
      
    </>
  );
}
