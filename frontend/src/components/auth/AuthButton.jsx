
const AuthButton = ({ text, ...props }) => {
  return (
    <button
      className="w-full bg-[#C65A2E] text-white py-3 rounded-lg font-medium hover:bg-[#1B4D4A] transition-all duration-300 shadow-md"
      {...props}
    >
      {text}
    </button>
  );
};

export default AuthButton;
