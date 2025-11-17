// src/pages/SellerSignup.jsx
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SellerSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    shopName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      // 1) Create account
      await axios.post(
        "http://localhost:3000/api/v1/seller/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // 2) Immediately sign in to get token (use same credentials)
      const signInRes = await axios.post(
        "http://localhost:3000/api/v1/seller/signin",
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = signInRes.data?.token;
      if (!token) {
        // If signin didn't return a token for some reason, tell user and send to signin page
        setMessage("Account created but automatic signin failed. Please sign in manually.");
        setTimeout(() => navigate("/seller/signin"), 1400);
        return;
      }

      // 3) Save token so your sellerApi axios interceptor works
      localStorage.setItem("sellerToken", token);

      // optional: save seller basic info if returned
      if (signInRes.data.seller) {
        localStorage.setItem("seller", JSON.stringify(signInRes.data.seller));
      }

      // 4) Redirect to seller control panel
      setMessage("Seller account created — redirecting to your control panel...");
      navigate("/seller/control");
    } catch (error) {
      console.error("Seller signup/signin error:", error);
      setMessage(
        error.response?.data?.message || error.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="bg-gradient-to-br from-[#F7F3EC] via-[#FFF9F5] to-[#FFFFFF] shadow-2xl rounded-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Vault Logo" className="w-32 h-32 object-contain" />
        </div>

        <AuthHeader
          title="Seller Signup"
          subtitle="Create your seller account and start your business"
        />

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <AuthInput
            label="Shop Name"
            name="shopName"
            placeholder="Craft House"
            value={formData.shopName}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <AuthInput
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <AuthInput
            label="Email"
            name="email"
            type="email"
            placeholder="shop@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Address (Optional)"
            name="address"
            placeholder="123 Street, City"
            value={formData.address}
            onChange={handleChange}
          />

          <AuthButton
            text={isSubmitting ? "Creating Seller Account..." : "Create Seller Account"}
            disabled={isSubmitting}
          />
        </form>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.toLowerCase().includes("created") || message.toLowerCase().includes("redirecting")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Already a seller?{" "}
          <a
            href="/seller/signin"
            onClick={(e) => {
              if (isSubmitting) e.preventDefault(); // prevent navigation while submitting
            }}
            className="text-[#C65A2E] font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};
