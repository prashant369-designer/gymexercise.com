import React from "react";
import Logo from "../../assets/images/metapos-logo-black.png";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center px-4 top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-1/3 absolute">
      <img src={Logo} className="w-40" alt="Logo" />

      <h1 className="text-[#C45330] text-7xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>

      <p className="text-gray-500 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/admin/dashboard")}
        className="bg-[#C45330] text-white py-2 px-6 rounded cursor-pointer hover:opacity-90 transition"
      >
        Go To Dashboard
      </button>
    </div>
  );
}

export default Error;