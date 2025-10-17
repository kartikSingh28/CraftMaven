const AuthHeader=({title,subtitle})=>{
    return (
        <div>
            <h2 className="text-3xl font-bold text-[#1B4D4A]">{title}</h2>
            {subtitle && <p className="text-gray-600 mt-2 text-sm">{subtitle}</p>}
        </div>
    );
};
export default AuthHeader;