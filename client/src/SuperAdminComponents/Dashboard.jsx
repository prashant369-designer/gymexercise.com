import React from "react";
import { FaChartGantt } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";


function MainDashboard() {
  const recentSales = [
    {
      name: 'MacBook Pro 16"',
      category: "Computers",
      price: 2499,
      status: "Completed",
      color: "bg-green-100 text-green-600",
      image:
        "https://images.unsplash.com/photo-1639087595550-e9770a85f8c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFjQm9vayUyMFBybyUyMDE2fGVufDB8fDB8fHww",
    },
    {
      name: "AirPods Pro Max",
      category: "Audio",
      price: 549,
      status: "Processing",
      color: "bg-orange-100 text-orange-500",
      image:
        "https://images.unsplash.com/photo-1628116709703-c1c9ad550d36?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QWlyUG9kcyUyMFBybyUyME1heHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: 'iPad Air 11"',
      category: "Tablets",
      price: 799,
      status: "Completed",
      color: "bg-green-100 text-green-600",
      image:
        "https://images.unsplash.com/photo-1640721952964-d9547dfd6cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aVBhZCUyMEFpciUyMDExfGVufDB8fDB8fHww",
    },
    {
      name: "Apple Watch Ultra",
      category: "Wearables",
      price: 799,
      status: "Pending",
      color: "bg-yellow-100 text-yellow-600",
      image:
        "https://images.unsplash.com/photo-1713056878930-c5604da9acfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXBwbGUlMjBXYXRjaCUyMFVsdHJhfGVufDB8fDB8fHww",
    },
    {
      name: "Magic Keyboard",
      category: "Accessories",
      price: 299,
      status: "Cancelled",
      color: "bg-red-100 text-red-500",
      image:
        "https://images.unsplash.com/photo-1654426542353-ba54b8f1752b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWFnaWMlMjBLZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const base_url = import.meta.env.VITE_API_URL;
    const image_url = import.meta.env.VITE_API_URL_IMAGE;

  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [product, setProduct] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [adminopen, setAdminOpen] = useState(false);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  // fetch user data
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${base_url}/superdash/user`);
      setUser(res.data);
    } catch (error) {
      console.error("User fetch error:", error);
    }
  };

  // fetch admin data
  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${base_url}/superdash/admin`);
      setAdmin(res.data);
    } catch (error) {
      console.error("Admin fetch error:", error);
    }
  };

  // fetch product data
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${base_url}/superdash/product`);
      setProduct(res.data);
    } catch (error) {
      console.error("Product fetch error:", error);
    }
  };

  // low stock products
  const fetchLowStockProducts = async () => {
    try {
      const res = await axios.get(`${base_url}/superdash/lowstock`);
      setLowStockProducts(res.data.data);
    } catch (error) {
      console.error("Low stock products fetch error:", error);
    }
  };

  // top selling products
  const fetchTopSellingProducts = async () => {
    try {
      const res = await axios.get(`${base_url}/superdash/topSelling`);
      setTopSellingProducts(res.data.data);
    } catch (error) {
      console.error("Top selling products fetch error:", error);
    }
  };

  useEffect(() => {
    fetchTopSellingProducts();
  }, []);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      {/* heading section */}
      <div className="py-4">
        <h2 className="text-2xl font-semibold">Super Admin Dashboard</h2>
        <h4 className="">Your main content goes here…</h4>
      </div>

      {/* total cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4">
        {/* total sales */}
        <div className="p-4 border border-[#FCEFEB] rounded-lg bg-[#FCEFEB] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#E66239] rounded-lg">
              <FaChartGantt />
            </div>
            <div onClick={() => setOpen(true)} className="cursor-pointer">
              <h2 className="pb-2">Total User</h2>
              <h2 className="font-bold text-2xl">{user.count}</h2>
              <p className="text-[#E66239] text-sm">+5% since last month</p>
            </div>
          </div>
        </div>

        {/* Total purchase */}
        <div className="p-4 border border-[#E5F9ED] rounded-lg bg-[#E5F9ED] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#00C951] rounded-lg">
              <FaChartGantt />
            </div>
            <div className="cursor-pointer" onClick={() => setAdminOpen(true)}>
              <h2 className="pb-2">Total Company</h2>
              <h2 className="font-bold text-2xl">{admin.count}</h2>
              <p className="text-[#00C951] text-sm">+22% since last month</p>
            </div>
          </div>
        </div>

        {/* Total expensis */}
        <div className="p-4 border border-[#E5F8FB] rounded-lg bg-[#E5F8FB] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#00B8DB] rounded-lg">
              <FaChartGantt />
            </div>
            <div
              onClick={() => setProductsOpen(true)}
              className="cursor-pointer"
            >
              <h2 className="pb-2">Total Product</h2>
              <h2 className="font-bold text-2xl">{product.count}</h2>
              <p className="text-[#00B8DB] text-sm">+10% since last month</p>
            </div>
          </div>
        </div>

        {/* Invoice Due */}
        <div className="p-4 border border-[#FDF7E5] rounded-lg bg-[#FDF7E5] ">
          <div className="flex gap-4 items-start">
            <div className="text-2xl border p-2 text-white bg-[#F0B100] rounded-lg">
              <FaChartGantt />
            </div>
            <div>
              <h2 className="pb-4">Invoice Due</h2>
              <h2 className="font-bold text-2xl">$25,000</h2>
              <p className="text-[#F0B100] text-sm">+35% since last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-4">
        {/* total sales */}
        <div className="p-4 border border-gray-300 rounded-lg ">
          <div className="flex gap-4 items-start justify-between px-4 pb-4">
            <div>
              <h2 className="font-bold text-2xl">$25,458</h2>
              <p className="text-sm py-2">Total Profit</p>
            </div>
            <div className="text-2xl text-[#E66239]">
              <FaRegCopy />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 border-t border-gray-300 py-2">
            <h2>+35% vs Last Month</h2>
            <button className="text-[#E66239] underline">view</button>
          </div>
        </div>

        {/* Total purchase */}
        <div className="p-4 border border-gray-300 rounded-lg ">
          <div className="flex gap-4 items-start justify-between px-4 pb-4">
            <div>
              <h2 className="font-bold text-2xl">$25,458</h2>
              <p className="text-sm py-2">Total Profit</p>
            </div>
            <div className="text-2xl text-[#E66239]">
              <FaRegCopy />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 border-t border-gray-300 py-2">
            <h2>+35% vs Last Month</h2>
            <button className="text-[#E66239] underline">view</button>
          </div>
        </div>

        {/* Total expensis */}
        <div className="p-4 border border-gray-300 rounded-lg ">
          <div className="flex gap-4 items-start justify-between px-4 pb-4">
            <div>
              <h2 className="font-bold text-2xl">$25,458</h2>
              <p className="text-sm py-2">Total Profit</p>
            </div>
            <div className="text-2xl text-[#E66239]">
              <FaRegCopy />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 border-t border-gray-300 py-2">
            <h2>+35% vs Last Month</h2>
            <button className="text-[#E66239] underline">view</button>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* Top Selling */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Top Selling Products</h2>
            <button className="text-sm border px-3 py-1 rounded">Today</button>
          </div>

          {topSellingProducts.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded">
                  <img
                    className="w-full h-full object-cover"
                    src={`${image_url}/${item.productImage}`}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    ${item.productSellingPrice} • {item.topSelling} Units
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded border `}>
                {item.topSelling % 100}%
              </span>
            </div>
          ))}
        </div>

        {/* Low Stock */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Low Stock Products</h2>
            <button className="text-sm text-red-500">View All</button>
          </div>

          {lowStockProducts.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded">
                  <img
                    className="w-full h-full object-cover"
                    src={`${image_url}/${item.productImage}`}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">ID: 001A{item.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-red-500 font-semibold">
                  {item.productInstock.toString().padStart(2, "0")}
                </p>
                <p className="text-xs text-gray-500">In Stock</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Sales */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recent Sales</h2>
            <button className="text-sm border px-3 py-1 rounded">Weekly</button>
          </div>

          {recentSales.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded">
                  <img
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.category} • ${item.price}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-102">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">User List</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm border px-3 py-1 rounded cursor-pointer "
                >
                  Close
                </button>
              </div>
              <div className="overflow-auto h-100 no-scrollbar">
                {user.data.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded">
                        <img
                          className="w-full h-full object-cover"
                          src={item.profile_image}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded`}>
                      {item.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {productsOpen && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-102">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg"> All Products</h2>
                <button
                  onClick={() => setProductsOpen(false)}
                  className="text-sm border px-3 py-1 rounded cursor-pointer "
                >
                  Close
                </button>
              </div>
              <div className="overflow-auto h-100 no-scrollbar">
                {product.data.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b last:border-none "
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded">
                        <img
                          className="w-full h-full object-cover"
                          src={`${image_url}/${item.productImage}`}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          {item.productCategory}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded`}>
                      ₹{item.productSellingPrice}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {adminopen && (
          <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-102">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Admin List</h2>
                <button
                  onClick={() => setAdminOpen(false)}
                  className="text-sm border px-3 py-1 rounded cursor-pointer "
                >
                  Close
                </button>
              </div>
              <div className="overflow-auto h-100 no-scrollbar">
                {admin.data.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b last:border-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded">
                        <img
                          className="w-full h-full object-cover"
                          src={item.profile_image}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.first_name} {item.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded`}>
                      {item.phone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MainDashboard;
