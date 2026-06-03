import React, { useEffect, useState } from "react";
import axios from "axios";

function WelcomeGym() {
  const [welcome, setWelcome] = useState(null);
  const [brands, setBrands] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


  const fetchData = async () => {
    try {
      const res = await axios.get(`${base_url}/welcomegym/`);
      const data = res.data.data[0];

      setWelcome(data);

      //  Parse brand logos
      if (data?.brandLogos) {
        setBrands(JSON.parse(data.brandLogos));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!welcome) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="bg-[#1E1E1E]">
      {/* Main Section */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-10 lg:py-20 px-4">
        
        {/* Left Image */}
        <div className="lg:w-1/2">
          <div className="group overflow-hidden rounded-xl">
            <img
              src={welcome.leftImage}
              alt="gym"
              className="w-full h-full object-cover  group-hover:scale-110"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 text-white">
          <h3 className="text-[#FF4857] uppercase tracking-widest text-sm">
            {welcome.subheading}
          </h3>

          <h1 className="text-3xl lg:text-5xl font-bold pt-3 leading-tight">
            {welcome.heading}
          </h1>

          <p className="text-gray-400 pt-6 pb-8 max-w-md leading-relaxed">
            {welcome.description}
          </p>

          <img
            className="w-full rounded-lg shadow-lg"
            src={welcome.rightImage}
            alt="gym"
          />
        </div>
      </div>

      {/* Brand Logos */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-10 px-4">
        {brands.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center"
          >
            <img
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-500 cursor-pointer"
              src={item.logo}
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WelcomeGym;