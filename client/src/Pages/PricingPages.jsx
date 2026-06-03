import React from "react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

function PricingPages() {
  const [data, setData] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


const fetchData = async () => {
  try {
    const response = await axios.get(`${base_url}/pricing/`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  fetchData();
}, []);

  return (
    <>
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      <div className="bg-[#1E1E1E]">
        {/* heading */}
        <div className="py-10 lg:py-20">
          <h1 className="text-white text-4xl font-semibold text-center">
            Pricing Plan
          </h1>
          <h2 className="text-2xl pt-6 text-white">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 py-0 lg:py-10 max-w-6xl mx-auto gap-10">
            {data?.plans?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col text-white py-16 px-4 lg:px-16 group bg-[#232327] transition-all duration-700"
              >
                <h2 className="text-3xl text-white group-hover:text-white pb-4">
                  {item.levels}
                </h2>
                <h2 className="text-4xl font-semibold text-[#EE4432]">
                  ${item.prize}
                </h2>
                <h2>{item.PrizePerdays}</h2>
                <p className="pt-2 text-gray-400  max-w-xs lg:max-w-2xl">
                  {item.Description}
                </p>
                <button className="border-2 text-white py-4 px-10 mt-8 group-hover:bg-[#FF4857]  group-hover:border-[#FF4857] group-hover:text-white transition-all duration-700 cursor-pointer">
                  Get Now
                </button>
              </div>
            ))}
          </div>

        <div className="max-w-6xl mx-auto py-16 px-4 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* LEFT SECTION */}
            <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Features</h1>

              <ul className="space-y-3 text-sm md:text-base list-decimal pl-5 marker:text-orange-400">
                <li>Adipiscing eli sed eiusmod</li>
                <li>Tempor incididunt</li>
                <li>Labore et dolore magna</li>
                <li>Labore et dolore magna</li>
                <li>Tempor incididunt</li>
                <li>Labore et dolore magna</li>
              </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                  Choose your plan
                </h2>
                <p className="opacity-80 leading-relaxed text-sm md:text-base">
                  Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut sed lorem diam nonumy odit aut fugit sed
                  aspernatur it.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                  About
                </h2>
                <p className="opacity-80 leading-relaxed text-sm md:text-base">
                  Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                  sit aspernatur aut sed lorem diam nonumy odit aut fugit, sed
                  quia. Dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                  voluptas sit aspernatur aut sed. Quia voluptas sit aspernatur
                  aut sed lorem diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default PricingPages;
