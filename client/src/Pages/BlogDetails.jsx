import React from "react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${base_url}/blog/${id}`);
      setBlog(response.data.blog[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

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
          {blog && (
            <div className="p-4 group relative">
              <div className="relative overflow-hidden">
                <img
                  src={blog.BlogImage}
                  alt=""
                  className="w-full h-90 object-contain"
                />
              </div>

              <div className="mt-4 text-white">
                <h3 className="font-medium text-2xl">{blog.BlogSubHeading}</h3>
                <h2 className="text-sm py-1">
                  {blog.PostOn}, {blog.BlogComments} comments
                </h2>
                <p className="text-gray-300 text-sm py-1">{blog.blogpara}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
