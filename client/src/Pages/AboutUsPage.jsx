import React from "react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import { useState, useEffect } from "react";

function AboutUsPage() {
  const [awards, setAwards] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  const fetchAwards = async () => {
    try {
      const response = await axios.get(`${base_url}/awards/`);
      setAwards(response.data.awards);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);
  return (
    <>
      <div className="bg-[#181818] ">
        <Navbar />
      </div>
      {/* heading */}
      <div className="bg-[#1E1E1E]">
        <div className="py-10 lg:py-20">
          <h1 className="text-white text-4xl font-semibold text-center">
            About Us
          </h1>
          <h2 className="text-2xl pt-6 text-white">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        {/* who we are */}
        <div className="py-4 lg:py-14 text-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 px-6">
            {/* Left Content */}
            <div className="flex-1">
              <h1 className="subheading">Who we are</h1>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold pt-3 max-w-xl">
                We create a new approach to sport
              </h1>

              <p className="text-gray-500 pt-6 max-w-xl">
                Adipiscing elit, sed do eiusmod tempor incididunt labore dolore
                magna aliqua. Ut enim ad minim veniam, quisq wiusmod ut tempor
                incididunt ut labore et dolore sed do magna.
              </p>

              <span className="flex items-center gap-2 pt-6 text-sm sm:text-base">
                <TfiEmail className="text-[#FF4857]" />
                info@example.com
              </span>
            </div>

            {/* Right Skills */}
            <div className="flex-1 w-full">
              {/* Crossfit */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold tracking-wider">
                  Crossfit
                </h2>

                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div className="bg-[#FF4857] h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              {/* Cardio */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold tracking-wider">
                  Cardio
                </h2>

                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div className="bg-[#FF4857] h-2 rounded-full w-[70%]"></div>
                </div>
              </div>

              {/* Yoga */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-wider">
                  Yoga
                </h2>

                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div className="bg-[#FF4857] h-2 rounded-full w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our service */}
        <div className="py-16 lg:py-20 px-4 lg:px-0">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-10 items-center">
            {/* Content */}
            <div className="w-full lg:w-2/3 text-white">
              <h1 className="subheading">for our clients</h1>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold pt-3 max-w-xl">
                Choose a healthy lifestyle now
              </h1>

              <p className="text-gray-500 pt-6 max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt labore.
              </p>

              <ul className="pt-6 list-decimal pl-5 text-sm opacity-70 space-y-2">
                <li>Adipiscing eli sed eiusmod</li>
                <li>Adipiscing eli sed eiusmod</li>
                <li>Adipiscing eli sed eiusmod</li>
              </ul>

              <button className="border-2 text-white py-3 px-8 sm:px-10 mt-8 bg-[#FF4857] border-[#FF4857] hover:bg-transparent transition cursor-pointer">
                Our Services
              </button>
            </div>
            {/* Images */}
            <div className="flex gap-2 sm:gap-6 w-full">
              <img
                className="w-1/2 object-cover "
                src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/img-016-copyright.jpg"
                alt=""
              />
              <img
                className="w-1/2 object-cover "
                src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/img-017-copyright.jpg"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* our awards */}
        <section className="bg-black py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="mb-14 text-center">
              <h2 className="text-5xl font-bold text-white">Awards Showcase</h2>
              <p className="text-gray-400 mt-3">
                Inspired by modern design platforms
              </p>
            </div>

            {/* Horizontal Scroll Wrapper */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className="min-w-65 h-105 relative group transform -skew-x-12 hover:skew-x-0 transition-all duration-500"
                >
                  {/* Inner Content (reverse skew) */}
                  <div className="w-full h-full overflow-hidden rounded-xl relative skew-x-12 group-hover:scale-105 transition duration-500">
                    {/* Image */}
                    <img
                      src={award.awardImage}
                      alt={award.awardName}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 p-6 text-white z-10">
                      <h3 className="text-xl font-bold">{award.awardName}</h3>

                      <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                        {award.awardDescription}
                      </p>

                      <span className="text-xs text-gray-400 mt-3 block">
                        {award.awardDate}
                      </span>
                    </div>

                    {/* Highlight Badge */}
                    {award.featured && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutUsPage;
