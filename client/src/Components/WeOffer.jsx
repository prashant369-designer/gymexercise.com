import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaPrescriptionBottle } from "react-icons/fa6";
import { PiSwimmingPool } from "react-icons/pi";
import { CgGym } from "react-icons/cg";
import { GiMuscleUp } from "react-icons/gi";

function WeOffer() {
  const [data, setData] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/service`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Icon mapping
  const iconMap = {
    dumbbell: <CgGym />,
    muscle: <GiMuscleUp />,
    nutrition: <FaPrescriptionBottle />,
    pool: <PiSwimmingPool />,
  };

  return (
    <div className="py-4 lg:py-10 bg-[#181818]">
      {/* Heading */}
      <div className="text-center text-white">
        <h1 className="pt-4 text-sm tracking-widest text-gray-400">
          {data?.subheading}
        </h1>

        <h1 className="text-2xl lg:text-6xl font-semibold max-w-2xl mx-auto pt-2 px-2">
          {data?.heading}
        </h1>

        <div className="text-2xl pt-6">
          <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 lg:py-10 max-w-6xl mx-auto">
        {data?.plans?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-white py-12 px-6 group hover:bg-[#FF4857] transition-all duration-700"
          >
            {/* Icon */}
            <div className="text-6xl text-[#FF4857] group-hover:text-white pb-4">
              {iconMap[item.icon]}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold">{item.title}</h2>

            {/* Description */}
            <p className="pt-2 text-center text-gray-400 group-hover:text-white max-w-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeOffer;
