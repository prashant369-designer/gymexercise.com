import { X } from "lucide-react";
import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaHandHoldingHeart } from "react-icons/fa";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;
    const image_url = import.meta.env.VITE_API_URL_IMAGE;


  //  GET USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data");
    }
  }, []);

  //  FETCH WISHLIST
  const fetchItems = async (userId) => {
    try {
      const response = await axios.get(`${base_url}/wishlist/${userId}`);

      setItems(response.data.wishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  //  REMOVE ITEM
  const removeItem = async (product_id) => {
    try {
      await axios.delete(`${base_url}/wishlist/remove`, {
        data: {
          user_id: user.id,
          product_id: product_id,
        },
      });

      // refresh list
      fetchItems(user.id);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  //  Add to Cart
  const handleAddToCart = async (item) => {
    try {
      if (!user) {
        toast("Please login first");
        return;
      }

      // 1. Add to Cart
      await axios.post(`${base_url}/cart/add`, {
        user_id: user.id,
        product_id: item.id,
        quantity: 1,
      });

      // 2. Remove from Wishlist
      await removeItem(item.id);

      // 3. Optional UI update (instant without API call)
      setItems((prev) => prev.filter((i) => i.id !== item.id));

      toast("Added to cart & removed from wishlist ");
    } catch (error) {
      console.error("Cart error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchItems(user.id);
    }
  }, [user]);

  return (
    <>
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-gray-100 rounded-xl">
          <div className="text-5xl sm:text-6xl text-[#5DB7F5] mb-4 flex justify-center">
            <FaHandHoldingHeart />
          </div>
          <p className="text-xl sm:text-2xl font-semibold">
            Your Wishlist is empty
          </p>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Start adding products to see them here
          </p>
        </div>
      ) : (
        <div className="py-10 h-screen">
          <h1 className="text-4xl font-semibold text-center py-10">
            Wishlist Page
          </h1>

          <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6">
            {/* HEADER (hidden on mobile) */}
            <div className="hidden sm:grid grid-cols-6 items-center border-b pb-3 mb-4 font-medium text-sm">
              <span>Action</span>
              <span className="col-span-2">Product</span>
              <span>Price</span>
              <span>Stock</span>
              <span></span>
            </div>

            {/* ITEMS */}
            {items.map((item) => (
              <div key={item.id} className="border-b py-4">
                {/* MOBILE VIEW */}
                <div className="flex flex-col sm:hidden gap-3">
                  {/* Top Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <img
                        src={`${image_url}/${item.productImage}`}
                        alt={item.productName}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {item.productName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ₹{Number(item.productSellingPrice).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button onClick={() => removeItem(item.id)}>
                      <X />
                    </button>
                  </div>

                  {/* Stock + Button */}
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm ${
                        item.productInstock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.productInstock > 0 ? "" : "Out of Stock"}
                    </span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 px-4 py-2 text-sm rounded-lg text-white hover:bg-green-600 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden sm:grid grid-cols-6 items-center">
                  {/* REMOVE */}
                  <div>
                    <button onClick={() => removeItem(item.id)}>
                      <X />
                    </button>
                  </div>

                  {/* IMAGE + NAME */}
                  <div className="col-span-2 flex items-center gap-4">
                    <img
                      src={`${image_url}/${item.productImage}`}
                      alt={item.productName}
                      className="w-16 h-16 object-contain"
                    />
                    <p className="text-sm sm:text-base">{item.productName}</p>
                  </div>

                  {/* PRICE */}
                  <span className="text-sm sm:text-base">
                    ₹{Number(item.productSellingPrice).toFixed(2)}
                  </span>

                  {/* STOCK */}
                  <span
                    className={`text-sm sm:text-base ${
                      item.productInstock > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.productInstock > 0 ? "In Stock" : "Out of Stock"}
                  </span>

                  {/* BUY */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-green-500 px-3 py-2 text-sm rounded-lg text-white hover:bg-green-600 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Wishlist;
