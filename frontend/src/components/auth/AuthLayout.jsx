import React from "react";

const AuthLayout=({children})=>{
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F3EC] px-4">
            {children}
        </div>
    )
}
export default AuthLayout;
