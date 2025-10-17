import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";

const Signin = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log({ email, password });
    // TODO: Connect to backend API for authentication
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
          <AuthInput label="Email" type="email" placeholder="you@example.com" name="email" />
          <AuthInput label="Password" type="password" placeholder="••••••••" name="password" />
          <AuthButton text="Sign In" type="submit" />
        </form>

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
