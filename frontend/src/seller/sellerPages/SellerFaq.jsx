import { SellerNavbar } from "../SellerNavbar";
import { FaqCardComponent } from "../sellerComponents/faqCard1";

import { FaqInfo } from "./FaqInfo"; // same folder, so just ./FaqInfo


export function SellerFaq() {
  return (
    <>
      <SellerNavbar />
      <FaqCardComponent />    {/* Overview cards */}
      <FaqInfo />        {/* Actual FAQ dropdowns */}
    </>
  );
}
