import React from "react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import AboutUs from "../components/AboutUs";
import Testimonial from "../components/Testimonial";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineDirectionsRun } from "react-icons/md";
import { GiBeerBottle } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function OurServicesPages() {
  const base_url = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className="bg-[#181818]  ">
        <Navbar />
      </div>

      <div className="bg-[#1E1E1E]">
        {/* heading */}
        <div className="py-10 lg:py-20">
          <h1 className="text-white text-4xl font-semibold text-center">
            Our Services
          </h1>
          <h2 className="text-2xl pt-6 text-white">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        {/* card container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 max-w-6xl mx-auto">
          {/* best equipment */}
          <div className="flex flex-col items-center text-white py-6 lg:py-16 px-6 group hover:border-pink-700 hover:bg-[#FF4857] transition-all duration-800 ">
            <h2 className="text-6xl text-[#FF4857] group-hover:text-white pb-4">
              <MdOutlineDirectionsRun />
            </h2>
            <h2 className="text-2xl font-semibold">Personal Training</h2>
            <p className="pt-2 text-center text-gray-400 group-hover:text-white max-w-xs lg:max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              quasi!
            </p>
            <span className="pt-6 text-xl text-[#FF4857] group-hover:text-white ">
              <FaArrowRightLong />
            </span>
          </div>

          {/* training plan */}
          <div className="flex flex-col items-center text-white py-6 lg:py-16 px-6 group hover:border-pink-700  hover:bg-[#FF4857] transition-all duration-800">
            <h2 className="text-6xl text-[#FF4857] group-hover:text-white pb-4">
              <GiBeerBottle />
            </h2>
            <h2 className="text-2xl font-semibold">Gym Store</h2>
            <p className="pt-2 text-center text-gray-400 group-hover:text-white max-w-xs lg:max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              quasi!
            </p>
            <span className="pt-6 text-xl text-[#FF4857] group-hover:text-white">
              <FaArrowRightLong />
            </span>
          </div>

          {/* Nutrition Plan */}
          <div className="flex flex-col items-center text-white py-6 lg:py-16 px-6 group hover:border-pink-700  hover:bg-[#FF4857] transition-all duration-800">
            <h2 className="text-6xl text-[#FF4857] group-hover:text-white pb-4">
              <FaHandHoldingHeart />
            </h2>
            <h2 className="text-2xl font-semibold">Cardio Equipment</h2>
            <p className="pt-2 text-center text-gray-400 group-hover:text-white max-w-xs lg:max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              quasi!
            </p>
            <span className="pt-6 text-xl text-[#FF4857] group-hover:text-white">
              <FaArrowRightLong />
            </span>
          </div>
        </div>

        {/* Offer section */}
        <div className="py-4 lg:py-10 bg-[#181818]">
          <div className="text-center text-white ">
            <h1 className="subheading pt-4">what we offer</h1>
            <h1 className="text-2xl lg:text-5xl font-semibold max-w-2xl mx-auto py-4 px-2">
              Transform your daily training routines with the awesome benefits
              of our
              <span className="bg-linear-to-r from-yellow-100 to-pink-500 bg-clip-text text-transparent px-2 font-bold">
                Gym Store
              </span>
            </h1>
            <h1 className="subheading pt-4">Peter Bowman</h1>
            <h1 className="opacity-60">Creative director</h1>
          </div>
        </div>
      </div>
      <div className="bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto">
          <AboutUs />
        </div>
      </div>
      <Testimonial />

      <Footer />
    </>
  );
}

export default OurServicesPages;
