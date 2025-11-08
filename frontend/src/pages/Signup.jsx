// src/pages/Signup.jsx
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/buyer/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Signup successful! Redirecting to Sign In...");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Signup failed. Please try again."
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
          <img
            src={logo}
            alt="CraftMaven Logo"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Header */}
        <AuthHeader
          title="Join CraftMaven"
          subtitle="Create an account to support artisans and explore handcrafted treasures"
        />

        {/* Form */}
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
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
          <AuthInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
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
            placeholder="123 Artisan Lane"
            value={formData.address}
            onChange={handleChange}
          />

          <AuthButton
            text={isSubmitting ? "Creating Account..." : "Create Account"}
            disabled={isSubmitting}
          />
        </form>

        {/* Feedback Message */}
        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-[#C65A2E] font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
