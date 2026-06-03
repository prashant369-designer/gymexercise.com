import React from "react";
import Slider from "react-slick";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";

const Testimonial = () => {
  const [hashtags, setHashtags] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;


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

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${base_url}/testimonial`);
      setTestimonials(res.data.testimonial);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  });

  // settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-[#1E1E1E] py-10">
        {/*testimonial */}
        <div className="max-w-6xl mx-auto px-6">
          <Slider {...settings}>
            {testimonials.map((item) => (
              <div key={item.id} className="px-3">
                <div className="p-2 lg:p-6 ">
                  {/* User */}
                  <div className="flex flex-col items-center justify-center gap-4 mb-4">
                    <img
                      className="w-24 h-24 rounded-full object-cover"
                      src={item.image}
                      alt={item.name}
                    />  
                    {/* Review */}
                    <p className="text-gray-400 text-sm lg:text-2xl  text-center italic leading-relaxed max-w-4xl mx-auto">
                      {item.Para}
                    </p>

                    <div className="flex flex-col  items-center ">
                      <span className="text-amber-400 text-3xl">
                        <BiSolidQuoteAltLeft />
                      </span>
                      <h2 className="font-semibold text-xl text-white">
                        {item.name}
                      </h2>
                      <p className="text-gray-400 text-sm">{item.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Scrolling hashtags */}
        <div className="w-full overflow-hidden py-6 bg-[#FF4857] mt-10">
          <div className="flex whitespace-nowrap animate-infinite-scroll gap-4 md:gap-6">
            {hashtags.map((item) => (
              <span
                key={item.id}
                className="shrink-0 
              text-xl text-white  font-bold 
              px-3 md:px-4 py-1 md:py-2"
              >
                {item.heading}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
