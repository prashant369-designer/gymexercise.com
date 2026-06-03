import React from "react";
import Navbar from "../CommonComponents/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

function HeroBanner() {
  const [hashtags , setHashtags] = useState([]);
  const [banner, setBanner] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  // Fetch Hashtags
  const fetchHashtags = async () => {
    try {
      const response = await axios.get(`${base_url}/scroller/`);
      setHashtags(response.data.scroller);
    } catch (error) {
      console.error("Error fetching hashtags:", error);
    }
  };
  
  useEffect(() => {
    fetchHashtags();
  }, []);


  // Fetch Banner
  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${base_url}/heroBanner/get`);
      setBanner(response.data.banner[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return (
    <div className="relative">
      {/* Main Image */}
      <img
        className="w-full h-[80vh] md:h-[80vh] lg:h-[106vh] object-cover object-center"
        src={banner.BannerImage}
        alt="gym banner"
      />

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
      </div>

      {/* Heading */}
      <div className="absolute top-1/3 left-5 md:left-10 lg:left-20">
        <h1
          className="max-w-xs md:max-w-xl lg:max-w-2xl 
        text-6xl  md:text-6xl lg:text-8xl 
        text-white font-bold tracking-wide"
        >
          {banner.BannerHeading}
        </h1>
      </div>

      {/* Infinite Hashtag Scroller */}
      <div className="absolute bottom-4 w-full overflow-hidden py-2">
        <div className="flex whitespace-nowrap animate-infinite-scroll gap-4 md:gap-6">
          {hashtags.map((item) => (
            <span
              key={item.id}
              className="shrink-0 
              text-xs lg:text-sm md:text-base 
              text-amber-300 
              px-6 md:px-4 py-4 md:py-2 
              bg-[#181818] rounded-lg"
            >
              # {item.heading}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
