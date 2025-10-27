import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function FeeType() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to Seller Payments with a scrollTarget
    navigate("/payments-info", { state: { scrollTarget: "fee-type-section" }, replace: true });
  }, [navigate]);

  return null;
}
