import Navbar from "../CommonComponents/Navbar";
import Footer from "../CommonComponents/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";

const Cart = () => {
  const [items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const base_url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_API_URL_IMAGE;


  const fetchCart = async () => {
    const res = await axios.get(`${base_url}/cart/${user.id}`);
    setItems(res.data.cart);
  };

  useEffect(() => {
    if (user) fetchCart();
  }, []);

  const updateQty = async (product_id, qty) => {
    await axios.put(`${base_url}/cart/update`, {
      user_id: user.id,
      product_id,
      quantity: qty,
    });

    fetchCart();
  };

  const removeItem = async (product_id) => {
    await axios.delete(`${base_url}/cart/remove`, {
      data: {
        user_id: user.id,
        product_id,
      },
    });

    fetchCart();
  };

  const total = items.reduce(
    (sum, item) => sum + item.productSellingPrice * item.quantity,
    0,
  );

  return (
    <>
      <div className="bg-[#181818]">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6 lg:h-screen">
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 px-2 sm:px-4">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-gray-100 rounded-xl">
              <div className="text-5xl sm:text-6xl text-[#5DB7F5] mb-4 flex justify-center">
                <FaCartShopping />
              </div>
              <p className="text-xl sm:text-2xl font-semibold">
                Your cart is empty
              </p>
              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Start adding products to see them here 
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-md rounded-xl p-3 sm:p-4 gap-3"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={`${image_url}/${item.productImage}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                      alt={item.productName}
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-base">
                        {item.productName}
                      </p>
                      <p className="text-gray-500 text-sm sm:text-base">
                        ₹{item.productSellingPrice}
                      </p>
                    </div>
                  </div>

                  {/* Quantity + Remove (mobile stacked, desktop inline) */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 sm:px-3 py-1 bg-gray-200 rounded text-sm"
                      >
                        -
                      </button>

                      <span className="px-2 sm:px-3 text-sm sm:text-base">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="px-2 sm:px-3 py-1 bg-gray-200 rounded text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm sm:text-base hover:underline cursor-pointer self-start sm:self-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - SUMMARY */}
        {items.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Delivery</span>
              <span className="text-green-500">Free</span>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-[#5DB7F5] text-white cursor-pointer py-3 rounded-lg hover:bg-blue-500 ">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
