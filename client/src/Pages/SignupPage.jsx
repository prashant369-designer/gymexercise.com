import React, { useState } from "react";
import axios from "axios";
import GymImage from "../assets/images/Gemini_Generated_Image_e0hoobe0hoobe0ho.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUpPage() {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;


  const [formdata, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formdata.first_name || !formdata.email || !formdata.password) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/auth/register`,
        formdata,
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black">
      <div className="flex items-center h-screen justify-center max-w-6xl mx-auto px-4 py-0 lg:py-4">
        {/* LEFT SIDE (FORM) */}
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-semibold text-left text-white mb-2">
            JOIN THE GRIND
          </h2>
          <p className="text-left text-gray-400 mb-6 text-sm">
            Create your fitness account
          </p>

          <form onSubmit={handlesubmit} className="space-y-5">
            {/* FIRST + LAST NAME */}
            <div className="flex gap-3">
              <input
                type="text"
                name="first_name"
                value={formdata.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-1/2 px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white   outline-none"
              />
              <input
                type="text"
                name="last_name"
                value={formdata.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-1/2 px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white   outline-none"
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white   outline-none"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white   outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* PHONE */}
            <input
              type="text"
              name="phone"
              value={formdata.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 bg-transparent border border-gray-500 rounded-lg text-white   outline-none"
            />

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white py-3 rounded-xl font-bold hover:bg-white transition duration-300 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* GOOGLE BUTTON */}
          <button
            disabled={loading}
            className="w-full border border-white py-3 mt-4 text-white hover:text-black rounded-xl font-bold hover:bg-white transition duration-800 disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Logging in..." : "Continue with Google"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-red-500 font-medium cursor-pointer underline">
                Login
              </span>
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="hidden md:block w-full ml-6">
          <div className="relative">
            <img
              src={GymImage}
              alt="gym"
              className="object-cover h-full w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
