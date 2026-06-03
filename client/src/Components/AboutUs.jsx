import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

function AboutUs() {
  const [about, setAbout] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  const fetchAboutUs = async () => {
    try {
      const response = await axios.get(`${base_url}/aboutus/`);
      setAbout(response.data.AboutUs[0]);
    } catch (error) {
      console.error("Error fetching about us:", error);
    }
  };

  useEffect(() => {
    fetchAboutUs();
  }, []);

  return (
    <div className="relative bg-[#1E1E1E]">
      {/* Overlay Heading */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 z-10 hidden lg:block">
        <h2 className="text-3xl md:text-5xl lg:text-6xl text-white font-semibold text-center w-full lg:max-w-3xl  ">
          {about.AboutHeading}
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center py-0 lg:py-10">
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-full object-cover"
            src={about.AboutImage}
            alt=""
          />
        </div>

        <div className="w-full lg:w-1/2 px-6 lg:px-20 text-[16px] lg:text-[18px]">
          <p className="text-gray-500 pb-6 pt-6 max-w-md">
            {about.AboutDescription}
          </p>

          <Link to="/aboutus">
          <button className="bg-[#FF4857] text-white py-3 px-8 mt-8 hover:bg-[#FF4857] transition duration-700 cursor-pointer">
            {about.AboutButton}
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
