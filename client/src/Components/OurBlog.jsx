import React from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";


function BlogSection() {


// Fetch blogs
  const [blog, setBlog] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${base_url}/blog`);
      setBlog(response.data.blog);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlog();
  })

  // settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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
    <section className="bg-[#181818] text-white py-4 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-xl uppercase pt-4">Our Blog</h1>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold max-w-2xl mx-auto pt-2">
            Latest News & Updates
          </h1>

          <h2 className="text-2xl pt-6">
            <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
          </h2>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {blog.map((blogs) => (
            <div key={blogs.id} className="px-2 sm:px-3 lg:px-4">
              <div className="group cursor-pointer">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={blogs.BlogImage}
                    alt=""
                    className="w-full h-48 sm:h-56 lg:h-60 object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>

                {/* Content */}
                <div className="mt-4">
                  <p className="text-xs tracking-widest">{blogs.BlogHeading}</p>

                  <h3 className="mt-1 font-semibold leading-snug group-hover:text-red-500">
                    {blogs.BlogSubHeading}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default BlogSection;
