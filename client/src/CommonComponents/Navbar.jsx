import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { PiShoppingCartLight } from "react-icons/pi";
import { GiSplitCross } from "react-icons/gi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiRamProfile } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { IoMdLogIn } from "react-icons/io";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

function Navbar() {
  const base_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(false);
  const [getprofile, setgetprofile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    profile_image: "",
    cover_image: "",
    address: "",
    gender: "",
    date_of_birth: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

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

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // toggle menu
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // fetch profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${base_url}/auth/getprofile/${user.id}`,
      );

      setgetprofile(response.data);

      // fill form data
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `${base_url}/auth/updateprofile/${user.id}`,
        formData,
      );

      toast(res.data.message);

      setEditMode(false);
      fetchProfile(); // refresh data
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center justify-between px-6 lg:px-12 py-5">
          {/* Logo */}
          <Link to="/">
            <img
              src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/logo-2.png"
              alt=""
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 text-white font-medium">
            {/* Home */}
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            {/* Pages */}
            <li className="relative group">
              <span className="flex items-center cursor-pointer hover:underline">
                Pages
              </span>
              <ul className="absolute left-0 mt-3 w-46 py-4 bg-[#2C2C2C] text-gray-500 text-sm rounded text-left  opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/gallery">Gallery</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/ourservices">Our Services</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/ourteam">Our Team</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/faq">FAQs</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/getquote">Get a Quote</Link>
                </li>
              </ul>
            </li>
            {/* Blog */}
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            {/* Shop */}
            <li className="relative group">
              <span className="flex items-center cursor-pointer hover:underline">
                Shop
              </span>
              <ul className="absolute left-0 mt-3 w-46 py-4 bg-[#2C2C2C] text-gray-500 text-sm rounded text-left  opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/shop">Product List</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="px-4 py-2 hover:underline hover:text-white hover:pl-8 hover:transition-all duration-200">
                  <Link to="/wishlist">Wishlist Page</Link>
                </li>
              </ul>
            </li>
            {/* Contact */}
            <li>
              <Link to="/contactus" className="hover:underline">
                Contacts
              </Link>
            </li>

            <div className="flex items-center gap-4 ml-6">
              {/* Cart */}
              <Link to="/cart">
                <span className="cursor-pointer text-2xl ">
                  <PiShoppingCartLight />
                </span>
              </Link>

              {/* dynamic profile and logout */}
              <span>
                {token ? (
                  <>
                    <li>
                      <button
                        onClick={() => setProfile(true)}
                        className="hover:underline  cursor-pointer text-xl"
                      >
                        {/* <FaRegUser /> */}
                        <img
                          src={getprofile?.profile_image}
                          alt=""
                          className="w-9 h-9 rounded-full cursor-pointer"
                        />
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login" className="hover:underline">
                      login
                    </Link>
                  </li>
                )}
              </span>

              {/* Side Menu */}
              <span
                className="cursor-pointer text-2xl transition-all duration-900"
                onClick={() => setSideOpen(true)}
              >
                <CgMenuGridR />
              </span>
            </div>
          </ul>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-2 text-white ">
            <span className="cursor-pointer text-2xl">
              <IoIosSearch />
            </span>
            <span>
              {token ? (
                <>
                  <li>
                    <button
                      onClick={() => setProfile(true)}
                      className="hover:underline  cursor-pointer text-2xl"
                    >
                      <img
                        src={getprofile?.profile_image}
                        alt=""
                        className="w-9 h-9 rounded-full cursor-pointer"
                      />
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="text-2xl">
                    <IoMdLogIn />
                  </Link>
                </li>
              )}
            </span>

            {menuOpen ? (
              <HiX
                size={28}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer z-99"
              />
            ) : (
              <HiMenu
                size={28}
                onClick={() => setMenuOpen(true)}
                className="cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <>
            <div className="lg:hidden fixed inset-0 bg-black text-white flex flex-col p-6 space-y-4 z-50 overflow-y-auto">
              <Link to="/">
                <img
                  src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/logo-2.png"
                  alt=""
                />
              </Link>
              <Link
                to="/"
                className="text-lg  pb-2 pt-20"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>

              {/* Pages */}
              <div>
                <button
                  onClick={() => toggleMenu("pages")}
                  className="w-full text-left text-lg flex justify-between  pb-2"
                >
                  Pages
                  <FaChevronDown />
                </button>

                {openMenu === "pages" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-gray-300">
                    <Link
                      to="/aboutus"
                      className="border-b border-gray-700 pb-2"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/ourservices"
                      className="border-b border-gray-700 pb-2"
                    >
                      Our Services
                    </Link>
                    <Link
                      to="/ourteam"
                      className="border-b border-gray-700 pb-2"
                    >
                      Our Team
                    </Link>
                    <Link to="/faq" className="border-b border-gray-700 pb-2">
                      FAQs
                    </Link>
                    <Link
                      to="/pricing"
                      className="border-b border-gray-700 pb-2"
                    >
                      Pricing
                    </Link>
                    <Link
                      to="/getquote"
                      className="border-b border-gray-700 pb-2"
                    >
                      Get a Quote
                    </Link>
                  </div>
                )}
              </div>

              {/* Blog */}
              <Link
                to="/blog"
                className="text-lg pb-2"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Shop */}
              <div>
                <button
                  onClick={() => toggleMenu("shop")}
                  className="w-full text-left text-lg flex justify-between pb-2"
                >
                  Shop
                  <FaChevronDown />
                </button>

                {openMenu === "shop" && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-gray-300">
                    <Link to="/shop" className="border-b border-gray-700 pb-2">
                      Product List
                    </Link>
                    <Link to="/cart" className="border-b border-gray-700 pb-2">
                      Cart
                    </Link>
                    <Link
                      to="/wishlist"
                      className="border-b border-gray-700 pb-2"
                    >
                      Wishlist
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contactus"
                className="text-lg  pb-2"
                onClick={() => setMenuOpen(false)}
              >
                Contacts
              </Link>

              <ul className="flex gap-2 justify-center items-center text-gray-400">
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Facebook
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Twitter
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Instagram
                </li>
                <li className="hover:underline hover:text-white hover:pl-4 hover:transition-all duration-400 cursor-pointer">
                  Youtube
                </li>
              </ul>
            </div>
          </>
        )}
      </nav>

      {/* sidelayout  */}
      {sideOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 z-50 flex justify-end transition-all duration-900">
          <div className="w-80 h-full bg-[#1c1c1c] text-white p-8">
            <div className="flex justify-between items-center mb-10 py-6">
              <img
                src="https://gym-store.axiomthemes.com/wp-content/uploads/2023/10/logo-2.png"
                alt="logo"
                className="w-32"
              />

              <span
                className="text-2xl cursor-pointer hover:animate-spin"
                onClick={() => setSideOpen(false)}
              >
                <GiSplitCross />
              </span>
            </div>

            <ul className="flex flex-col space-y-4 text-lg py-14 gap-4">
              <li className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                <FaFacebookF />
                Facebook
              </li>
              <li className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                <FaInstagram />
                Instagram
              </li>
              <li className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                <FaTwitter />
                Twitter
              </li>
              <li className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
                <FaYoutube />
                Youtube
              </li>
            </ul>

            <div className="flex flex-col bottom-4 py-10 gap-2">
              <h1 className="text-2xl">1234-567-890</h1>
              <p className="text-gray-400">info@gmail.com</p>
            </div>
          </div>
        </div>
      )}

      {profile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full lg:w-105 h-full bg-linear-to-b from-[#1e1e1e] to-[#0f0f0f] text-white px-4 lg:px-8 py-6 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.6)] lg:rounded-l-3xl transition-all duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold tracking-wide">Profile</h2>
              <button
                onClick={() => setProfile(false)}
                className="text-xl hover:text-gray-400 border border-gray-600 p-2 rounded-full transition cursor-pointer"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Cover + Profile */}
            <div className="relative mt-4">
              <img
                src={getprofile?.cover_image}
                alt="cover"
                className="w-full h-36 object-cover rounded-2xl opacity-90"
              />
              <img
                src={getprofile?.profile_image}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-[#121212] absolute -bottom-12 left-6 shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="mt-16 space-y-5 overflow-y-auto pr-2 no-scrollbar">
              {editMode ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-200">
                    Edit Profile
                  </h3>

                  {/* Inputs */}
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      name="profile_image"
                      value={formData.profile_image || ""}
                      onChange={handleChange}
                      placeholder="Profile Image URL"
                      className="input-style"
                    />

                    <input
                      type="text"
                      name="cover_image"
                      value={formData.cover_image || ""}
                      onChange={handleChange}
                      placeholder="Cover Image URL"
                      className="input-style"
                    />

                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleChange}
                      placeholder="Write something about you..."
                      rows="3"
                      className="input-style"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="gender"
                        value={formData.gender || ""}
                        onChange={handleChange}
                        className="input-style"
                      >
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>

                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth || ""}
                        onChange={handleChange}
                        className="input-style"
                      />
                    </div>

                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      placeholder="Address"
                      className="input-style"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={handleChange}
                        placeholder="City"
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="state"
                        value={formData.state || ""}
                        onChange={handleChange}
                        placeholder="State"
                        className="input-style"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ""}
                        onChange={handleChange}
                        placeholder="Country"
                        className="input-style"
                      />
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode || ""}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="input-style"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleUpdateProfile}
                      className="btn-primary cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="btn-secondary cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold">
                      {user ? `${user.first_name} ${user.last_name}` : "Guest"}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                      {getprofile?.bio}
                    </p>
                  </div>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card">
                      <p className="label">Gender</p>
                      <p>{getprofile?.gender}</p>
                    </div>

                    <div className="card">
                      <p className="label">DOB</p>
                      <p>{getprofile?.date_of_birth?.split("T")[0]}</p>
                    </div>
                  </div>

                  <div className="card">
                    <p className="label">Address</p>
                    <p className="mt-1 text-sm text-gray-300">
                      {getprofile?.address}, {getprofile?.city}
                    </p>
                    <p className="text-sm text-gray-400">
                      {getprofile?.state}, {getprofile?.country} -{" "}
                      {getprofile?.pincode}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditMode(true)}
                className="btn-primary cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={handleLogout}
                className="btn-danger cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
