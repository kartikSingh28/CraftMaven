import React from "react";

const AuthInput = ({ label, type = "text", placeholder, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4D4A] focus:border-transparent"
        {...props}
      />
    </div>
  );
};

export default AuthInput;
