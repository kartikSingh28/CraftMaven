// src/pages/Signup.jsx
import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthHeader from "../components/auth/AuthHeader";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import logo from "../assets/LOGO.png";

const Signup = () => {
  return (
    <AuthLayout>
      <AuthCard className="bg-gradient-to-br from-[#F7F3EC] via-[#FFF9F5] to-[#FFFFFF] shadow-2xl rounded-2xl p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="CraftMaven Logo" className="w-32 h-32 object-contain" />
        </div>

        {/* Header */}
        <AuthHeader
          title="Join CraftMaven"
          subtitle="Create an account to support artisans and explore handcrafted treasures"
        />

        {/* Form */}
        <form className="space-y-4 mt-4">
          <AuthInput label="Full Name" placeholder="Your Name" />
          <AuthInput label="Email" type="email" placeholder="you@example.com" />
          <AuthInput label="Password" type="password" placeholder="••••••••" />
          <AuthButton text="Create Account" />
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-[#C65A2E] font-medium hover:underline">
            Sign in
          </a>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
