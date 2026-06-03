import React from "react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";

function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqsData, setFaqsData] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${base_url}/faq/get`);
      setFaqsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  if (!faqsData) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="bg-[#181818]">
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
        <div className=" pb-10 px-4 lg:px-0 text-white">
          {/* FAQ List */}
          <div className="space-y-6">
            {faqsData.map((faq, index) => (
              <div
                key={index}
                className="max-w-3xl mx-auto border p-6 cursor-pointer transition-all duration-700"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="italic font-serif text-xl">{faq.question}</h2>
                  {activeIndex === index ? (
                    <FiMinus className="text-xl transition-all duration-700" />
                  ) : (
                    <FiPlus className="text-xl transition-all duration-700" />
                  )}
                </div>

                {activeIndex === index && (
                  <p className="mt-4 text-sm opacity-60 leading-relaxed transition-all duration-700">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-98 lg:h-screen overflow-hidden">
        <img
          src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/img-015-copyright.jpg"
          alt="Gym"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-white cursor-pointer hover:scale-110 transition">
              <div className="w-0 h-0 border-l-10 border-l-white border-y-[6px] border-y-transparent ml-1"></div>
            </div>
          </div>

          <p className="text-white tracking-widest text-sm mb-3">CHOOSE US</p>

          <h1 className="text-white text-2xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl">
            Regardless of your sport of choice, our center cultivates champions
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faq;
