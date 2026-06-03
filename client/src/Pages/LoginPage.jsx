import React, { useState } from "react";
import axios from "axios";
import GymImage from "../assets/images/Gemini_Generated_Image_813z0813z0813z08.png";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function LoginPage() {
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;

  const [formdata, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formdata.email || !formdata.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/auth/login`, formdata);

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "superadmin") {
          navigate("/superadmin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
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
            Hey,Welcome back !
          </h2>
          <p className="text-left text-gray-400 mb-6 text-sm">
            Please enter your details
          </p>

          <form onSubmit={handlesubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              {/* <label className="block text-white font-medium">Email</label> */}
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-3 bg-transparent border border-gray-500 rounded-xl text-white  outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              {/* <label className="block font-medium text-white">Password</label> */}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-3 bg-transparent border border-gray-500 rounded-xl text-white  outline-none"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-gray-400 cursor-pointer text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>

              <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="rounded-full cursor-pointer"
                  />
                  Remember me
                </label>

                <Link to="/forgetpassword">
                  <h2 className="underline cursor-pointer">Forgot password</h2>
                </Link>
              </div>
            </div>

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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* GOOGLE BUTTON */}
          <button className="w-full border border-white py-3 mt-4 text-white hover:text-black rounded-xl font-bold hover:bg-white transition duration-800 disabled:opacity-60 cursor-pointer">
            Continue with Google
          </button>

          {/* SIGNUP */}
          <p className="text-sm text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-red-500 font-medium cursor-pointer underline">
                SignUpHere
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
              className="object-cover w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
