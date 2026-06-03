import React from "react";
import { MdEmail } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#181818] text-white py-12 ">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>
          <img
            src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/logo-2.png"
            alt="logo"
            className="mb-4"
          />
          <h2 className="text-xl font-semibold mb-4 lg:hidden">
            Transform your body , transform your life
          </h2>

          <h2 className="text-sm font-semibold mb-0 lg:mb-22">
            Newsletter Signup
          </h2>

          {/* Email Input */}
          <div className="flex items-center border-b border-gray-600 py-2 mb-4">
            <MdEmail className="text-lg text-gray-400 mr-2" />

            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-transparent outline-none flex-1"
            />

            <button className="ml-2 cursor-pointer text-gray-300 hover:text-amber-300">
              <FaArrowRightLong />
            </button>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <input className="cursor-pointer" type="checkbox" />
            <p>
              I agree to the{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-4xl font-bold mb-22 max-w-sm tracking-wide hidden lg:block ">
            Transform your body, transform your life
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Socials</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Facebook
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Twitter
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Instagram
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Youtube
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Menu</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  <Link to="/">
                  Home</Link>
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  <Link to="/ourservices">
                  Service
                  </Link>
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  <Link to="/aboutus">
                  About Us
                  </Link>
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  <Link to="/shop">
                  Shop
                  </Link>
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  <Link to="/contactus">
                  Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Say Hello</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:underline hover:text-white  hover:transition-all duration-400 cursor-pointer">
                  info@email.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
