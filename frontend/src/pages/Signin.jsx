import React, { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    setIsSubmitting(true);
    setMessage("");

    try {
      // Call backend API
      const res = await axios.post(
        "http://localhost:3000/api/v1/buyer/signin",
        { email, password },
        { withCredentials: true } // allows cookies / CORS auth
      );

      // ✅ Store JWT securely
      localStorage.setItem("buyerToken", res.data.token);

      setMessage("Signin successful!");
      console.log("Token:", res.data.token);

      // Navigate to buyer dashboard
      navigate("/buyer/dashboard");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="bg-gradient-to-br from-[#F7F3EC] via-[#FFF9F5] to-[#FFFFFF] shadow-2xl rounded-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="CraftMaven Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Header */}
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to continue your CraftMaven journey"
        />

        {/* Form */}
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <AuthInput label="Email" type="email" name="email" placeholder="you@example.com" />
          <AuthInput label="Password" type="password" name="password" placeholder="••••••••" />
          <AuthButton text={isSubmitting ? "Signing In..." : "Sign In"} type="submit" disabled={isSubmitting} />
        </form>

        {/* Feedback */}
        {message && (
          <p className={`text-center mt-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        {/* Footer */}
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
