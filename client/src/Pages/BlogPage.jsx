import React from "react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Blog = () => {
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
  };

  useEffect(() => {
    fetchBlog();
  });

  return (
    <>
      {/* navbar */}
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      {/* heading */}
      <div className="py-10 lg:py-20 bg-[#181818]">
        <h1 className="text-white text-4xl font-semibold text-center">
          Blog – Standard
        </h1>
        <h2 className="text-2xl pt-6 text-white">
          <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto" />
        </h2>
      </div>

      {/* Blogs */}
      <div className="bg-[#181818]">
        <div className="flex gap-8 px-4 max-w-7xl mx-auto">
          {/* LEFT - PRODUCTS */}
          <div className="w-2/2">
            <div className="grid grid-cols-1 gap-0 lg:gap-6">
              {blog.map((item) => (
                <div key={item.id} className="p-4 group relative">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Link to={`/blogdetails/${item.id}`}>
                    <img
                      src={item.BlogImage}
                      alt=""
                      className="w-full lg:h-120 object-contain lg:object-fill"
                    />
                    </Link>
                  </div>

                  <div className="mt-4 text-white">
                    <h3 className="font-medium text-lg lg:text-2xl">
                      {item.BlogSubHeading}
                    </h3>
                    <h2 className="text-sm py-1">
                      {item.BlogComments} comments
                    </h2>
                    <p className="text-gray-300 text-sm py-1 line-clamp-2 text-pretty">
                      {item.blogpara}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - SIDEBAR */}
          <div className="bg-[#181818] p-6 h-screen hidden lg:block">
            {/* Search */}
            <div className="mb-6 text-white">
              <h2 className="font-semibold mb-2">Search</h2>
              <input
                type="text"
                placeholder="Search for Blogs ..."
                className="w-full border px-4 py-2 text-white"
              />
            </div>

            {/* Categories */}
            <div className="mb-6 text-white">
              <h2 className="font-semibold mb-2">Categories</h2>
              <ul className="space-y-2">
                <li>• Health (2)</li>
                <li>• Lifestyle (1)</li>
                <li>• Shopping (3)</li>
                <li>• Standard (2)</li>
                <li>• Swimming (2)</li>
                <li>• Training (2)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
