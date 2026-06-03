import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import Footer from "../CommonComponents/Footer";
import Navbar from "../CommonComponents/Navbar";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../CommonComponents/loader"
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_API_URL_IMAGE;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data in localStorage");
    }
  }, []);

  // authentication check
  const isAuthenticated = () => {
    return user && token;
  };

  //  Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/products/`);
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
      finally {
        setLoading(false);
      }
  };

  //  Fetch wishlist (ONLY ONCE)
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      if (!user) return;

      const res = await axios.get(`${base_url}/wishlist/${user.id}`);
      setWishlist(res.data.wishlist);
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    }
    finally { 
    setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  //  Add to Cart
  const handleAddToCart = async (item) => {
    try {
      if (!isAuthenticated()) {
        toast("Please login first");
        return;
      }

      await axios.post(
        `${base_url}/cart/add`,
        {
          user_id: user.id,
          product_id: item.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast("Added to cart successfully ");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  //  Toggle Wishlist
  const handleWishlist = async (item) => {
    try {
      if (!isAuthenticated()) {
        toast("Please login first");
        return;
      }

      const exists = wishlist.some((w) => w.id === item.id);

      if (exists) {
        await axios.delete(`${base_url}/wishlist/remove`, {
          data: {
            user_id: user.id,
            product_id: item.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWishlist((prev) => prev.filter((w) => w.id !== item.id));
      } else {
        await axios.post(
          `${base_url}/wishlist/add`,
          {
            user_id: user.id,
            product_id: item.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setWishlist((prev) => [...prev, item]);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <>
    {loading && <div className="h-screen">
    <Loader/>
    </div>
    
    }
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      <div className="py-10 bg-gray-100 text-center">
        <h1 className="text-black text-4xl font-semibold">Products List</h1>
        <MdOutlineKeyboardDoubleArrowDown className="animate-bounce mx-auto mt-4 text-2xl" />
      </div>

      <div className="bg-gray-100 py-10 px-0 lg:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-0 lg:gap-2">
          {products.map((item) => {
            const isWishlisted = wishlist.some((w) => w.id === item.id);
            return (
              <div key={item.id} className="group relative p-2 lg:p-4">
                <div className="relative overflow-hidden">
                  <img
                    src={`${image_url}/${item.productImage}`}
                    alt={item.productName}
                    loading="lazy"
                    className="w-full h-60 object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100  ">
                    <button
                      onClick={() => handleWishlist(item)}
                      className={`p-3 rounded-full shadow   cursor-pointer ${
                        isWishlisted
                          ? "bg-red-600 text-white"
                          : "bg-white hover:bg-red-600 hover:text-white"
                      }`}
                    >
                      <Heart size={18} />
                    </button>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.productInstock === 0}
                      className={`p-3 rounded-full shadow   ${
                        item.productInstock === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-white hover:bg-green-600 hover:text-white cursor-pointer"
                      }`}
                    >
                      <ShoppingCart size={18} />
                    </button>

                    <Link to={`/productdetails/${item.id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white p-3 rounded-full  ">
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="flex justify-between text-gray-500 text-sm uppercase">
                    {item.BrandName}
                    {item.productInstock > 0 ? (
                      <p className="text-green-600 text-sm lowercase"></p>
                    ) : (
                      <p className="text-red-600 text-sm lowercase">
                        Out of Stock
                      </p>
                    )}
                  </p>
                  <h3 className="font-medium leading-tight text-sm">
                    {item.productName}
                  </h3>

                  <p className="flex flex-wrap lg:flex-nowrap gap-1 lg:gap-2 items-center">
                    <span className="font-semibold text-sm sm:text-base">
                      ₹{item.productSellingPrice}
                    </span>

                    <span className="line-through text-xs sm:text-sm text-gray-500">
                      ₹{item.productPurchasePrice}
                    </span>

                    <span className="text-green-600 text-xs sm:text-sm">
                      {item.discountPercent}% off
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
