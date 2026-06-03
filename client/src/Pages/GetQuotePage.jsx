import React from "react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import { useState } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaRegEdit,
  FaTelegramPlane,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";


function GetQuotePage() {
  const base_url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/quotes/create`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      console.log(response.data);
      toast(" Submitted Successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };
  return (
    <>
      <div className="bg-[#181818]">
        <Navbar />
      </div>
      <div className="bg-[#1E1E1E]">
        <div className="py-10 lg:py-20">
          <h1 className="text-white text-4xl font-semibold text-center">
            Get a Quote
          </h1>
          <h2 className="text-2xl pt-6 text-white">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        <div className="text-white pb-10 px-4 max-w-6xl mx-auto">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm tracking-widest text-gray-400 mb-2">
                REQUEST A QUOTE
              </p>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                Have{" "}
                <span className="bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent pr-2">
                  questions?
                </span>
                <br className="hidden lg:block" />
                Get in touch!
              </h1>

              <img
                src="https://gym-store.axiomthemes.com/wp-content/uploads/elementor/thumbs/img-043-copyright-qg42iv6fkcdy9oyugoheuiilre3u0nxeu0ti47d0bc.jpg"
                alt="Gym"
                className="w-full object-cover"
              />
            </div>

            <div className="bg-[#1a1a1a] p-6 md:p-10 rounded-lg shadow-lg">
              <div className="space-y-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="flex items-center border-b border-gray-600 py-2">
                    <FaUser className="mr-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-center border-b border-gray-600 py-2">
                    <FaPhoneAlt className="mr-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-center border-b border-gray-600 py-2">
                    <FaEnvelope className="mr-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-center border-b border-gray-600 py-2">
                    <FaRegEdit className="mr-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex items-start border-b border-gray-600 py-2">
                    <FaRegEdit className="mr-3 mt-2 text-gray-400" />
                    <textarea
                      placeholder="How can we help you? Feel free to get in touch!"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="bg-transparent w-full outline-none text-white placeholder-gray-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded flex items-center gap-2 transition cursor-pointer"
                  >
                    <FaTelegramPlane /> Get In Touch
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GetQuotePage;
