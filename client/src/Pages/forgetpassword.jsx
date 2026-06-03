import { useState } from "react";
import GymImage from "../assets/images/2302.i402.021.S.m004.c13.Smartphone data protection flat composition.jpg";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const base_url = import.meta.env.VITE_API_URL;


  const API = `${base_url}/auth`;

  const sendOtp = async () => {
    try {
      const res = await fetch(`${API}/sendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setStep(2);
    } catch (err) {
      setMessage("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(`${API}/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setStep(3);
    } catch (err) {
      setMessage("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    try {
      const res = await fetch(`${API}/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setStep(1);
    } catch (err) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="bg-black">
      <div className="flex items-center h-screen justify-center max-w-6xl mx-auto px-4 py-0 lg:py-4">
        {/* Forgot Password Form */}
        <div className="p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-left mb-2 text-white">
            Forgot Password
          </h2>
          <p className="text-left text-sm mb-4 text-white">
            Enter your e-mail address, and
            we'll give you reset instruction.
          </p>

          {step === 1 && (
            <div>
                <label
                className="text-white font-semibold block py-2"
                htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              />
              <button
                onClick={sendOtp}
                className="w-full bg-white border border-white font-bold text-black hover:text-white hover:bg-black p-3 rounded-lg  cursor-pointer transition duration-300 ease-in-out mt-6"
              >
                Send OTP
              </button>
              <Link to="/login">
              <button
                className="w-full bg-white border border-white font-bold text-black hover:text-white hover:bg-black p-3 rounded-lg  cursor-pointer transition duration-300 ease-in-out mt-4"
              >
                Back to login
              </button>
              </Link>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
                  <label
                className="text-white font-semibold block"
                htmlFor="email">Verify OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-white focus:ring-blue-400"
              />
              <button
                onClick={verifyOtp}
                className="w-full bg-white text-black hover:text-white hover:bg-black p-3 rounded-lg transition duration-300 ease-in-out border cursor-pointer"
              >
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
                <label
                className="text-white font-semibold block"
                htmlFor="email">Type New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-white focus:ring-blue-400"
              />
              <button
                onClick={resetPassword}
                className="w-full bg-white text-black hover:text-white hover:bg-black p-3 rounded-lg transition duration-300 ease-in-out border cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          )}
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
