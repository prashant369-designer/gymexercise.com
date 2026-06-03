import React, { useState, useEffect } from "react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUs() {
  const base_url = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Phone: "",
    message:"",
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
      const response = await axios.post(
        `${base_url}/contactus/create`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          Phone: formData.Phone,
          email: formData.email,
          message: formData.message
        },
      );

      console.log(response.data);
      toast(" Submitted Successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        Phone: "",
        message:""
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  return (
    <>
      <div className="bg-[#181818] ">
        <Navbar />

        <div className="flex flex-col md:flex-row max-w-6xl items-center mx-auto gap-14 lg:py-20 py-10 px-4 ">
          <div className="w-full md:w-1/2 ">
            <h2 className="text-3xl italic text-white font-bold mb-4 text-center lg:text-left">
              Contact Us
            </h2>
            <p className="mb-6  text-white lg:w-110 ">
              Have a question, need styling advice, or want to get in touch?
              We’re here to help. Fill out the form below or reach out via
              email, and our team will get back to you as soon as possible.
            </p>

            <form className=" text-white mt-10" onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name*</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b-2 border-white rounded-md p-2 mb-4"
              />

              <label htmlFor="lastName">Last Name*</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b-2 border-white rounded-md p-2 mb-4"
              />

              <label htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-white rounded-md p-2 mb-4"
              />

              <label htmlFor="Phone">Phone*</label>
              <input
                id="Phone"
                name="Phone"
                type="text"
                required
                value={formData.Phone}
                onChange={handleChange}
                className="w-full border-b-2 border-white rounded-md p-2 mb-6"
              />
              <label htmlFor="Phone">Message*</label>
              <input
                id="message"
                name="message"
                type="text"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full border-b-2 border-white rounded-md p-2 mb-6"
              />

              <button type="submit" className="border text-white py-2 px-6">
                Submit
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2">
            <img
              className="w-full lg:h-screen "
              src="https://static.wixstatic.com/media/c837a6_9557def31b874b2da7b479307603403d~mv2.png"
              alt="Contact"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactUs;
