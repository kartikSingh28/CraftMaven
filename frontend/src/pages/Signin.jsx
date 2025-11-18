// src/pages/Signin.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";
import axios from "axios";

const Signin = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <<-- needed to read ?redirect=

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:3000/api/v1/buyer/signin", { email, password });

      // token should always be present; buyer may be absent depending on backend
      const token = res.data?.token;
      const buyerName = res.data?.buyer?.name || res.data?.buyer?.firstName || "";

      if (!token) {
        setMessage("Signin failed: no token returned.");
        setIsSubmitting(false);
        return;
      }

      // store token + optional name (safe even if buyerName === "")
      localStorage.setItem("buyerToken", token);
      if (buyerName) localStorage.setItem("buyerName", buyerName);

      // read redirect param from URL (nav from NavBar uses ?redirect=/home2)
      const redirect = new URLSearchParams(location.search).get("redirect") || "/home2";

      // navigate to redirect (this fixes "no routes matched" if you use /home2)
      navigate(redirect);
    } catch (err) {
      console.error("Signin error response:", err.response?.data || err);
      setMessage(err.response?.data?.message || "Signin failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="bg-gradient-to-br from-[#F7F3EC] via-[#FFF9F5] to-[#FFFFFF] shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="CraftMaven Logo" className="w-32 h-32 object-contain" />
        </div>

        <AuthHeader title="Welcome Back" subtitle="Sign in to continue your CraftMaven journey" />

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <AuthInput label="Email" type="email" name="email" placeholder="you@example.com" />
          <AuthInput label="Password" type="password" name="password" placeholder="••••••••" />
          <AuthButton text={isSubmitting ? "Signing In..." : "Sign In"} type="submit" disabled={isSubmitting} />
        </form>

        {message && (
          <p className={`text-center mt-4 ${message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#C65A2E] font-medium hover:underline">
            Sign up
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signin;
