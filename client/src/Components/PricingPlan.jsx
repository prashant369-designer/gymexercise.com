import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PricingPlan() {
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
      <div className="bg-[#222020]">
        <div className="py-10 text-white max-w-6xl mx-auto ">
          <h1 className="subheading px-6 ">{data?.heading}</h1>
          <h1 className="text-4xl lg:text-6xl font-semibold pt-2 px-6">
            {data?.subheading}
          </h1>
          <p className="text-gray-500 pb-10 pt-6 max-w-sm px-6">
            {data?.para}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4 py-0 lg:py-10 max-w-6xl mx-auto gap-10">
            {data?.plans?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col text-white py-16 px-4 lg:px-16 group bg-[#232327] "
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
                <Link to="/pricing">
                <button className="border-2 text-white py-4 px-10 mt-8 group-hover:bg-[#FF4857]  group-hover:border-[#FF4857] group-hover:text-white transition-all duration-700 cursor-pointer">
                  Get Now
                </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingPlan;
