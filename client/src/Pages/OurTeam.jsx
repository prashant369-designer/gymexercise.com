import React from "react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function OurTeam() {
  const [team, setTeam] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  const fetchTeam = async () => {
    try {
      const response = await axios.get(`${base_url}/mentor`);
      setTeam(response.data.mentor);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTeam();
  }, []);
  return (
    <>
      <div className="bg-[#181818] ">
        <Navbar />
      </div>

      <div className="bg-[#1E1E1E]">
        {/* heading */}
        <div className="py-10 lg:py-20">
          <h1 className="text-white text-4xl font-semibold text-center">
            Our Team
          </h1>
          <h2 className="text-2xl pt-6 text-white">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        {/* card container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 max-w-6xl mx-auto pb-10 px-4">
          {team.map((item) => (
            <div key={item._id} className="text-white group">
              <div className="relative">
                <img
                  className="w-full h-120 object-cover lg:object-fill"
                  src={item.mentorImage}
                  alt=""
                />

                {/* Hover Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100  bg-black/40">
                  <a
                    href={item.mentorFacebook}
                    target="_blank"
                    className="px-2 py-2 rounded-full bg-white text-black cursor-pointer hover:bg-red-600 hover:text-white "
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={item.mentorInsta}
                    target="_blank"
                    className="px-2 py-2 rounded-full bg-white text-black cursor-pointer hover:bg-green-600 hover:text-white transition duration-700"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a href={item.mentorYoutube}
                  target="_blank"
                  className="px-2 py-2 rounded-full bg-white text-black cursor-pointer hover:bg-yellow-600 hover:text-white transition duration-700"
                    rel="noopener noreferrer">
                    <CiYoutube />
                  </a>
                </div>
              </div>

              <h2 className="font-semibold pt-2">{item.mentorName}</h2>
              <h4 className="text-gray-400 text-sm">
                 {item.mentorExperties}
              </h4>
              <p className="text-gray-200 text-sm">{item.mentorBio}</p>
            </div>
          ))}
        </div>

        {/* End */}
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
      </div>

      <Footer />
    </>
  );
}

export default OurTeam;
