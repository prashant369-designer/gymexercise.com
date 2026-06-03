import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(false);
  const base_url = import.meta.env.VITE_API_URL;

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


  // toggle menu
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // fetch profile
const fetchProfile = async () => {
  if (!user?.id) return;

  try {
    const response = await axios.get(
      `${base_url}/auth/getprofile/${user.id}`
    );

    setgetprofile(response.data);
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
    <div className="h-full text-black px-4 lg:px-8 flex flex-col ">
      {/* Cover + Profile */}
      <div className="relative">
        <img
          src={getprofile?.cover_image}
          alt="cover"
          className="w-full h-46 object-cover rounded-2xl opacity-90"
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
            <h3 className="text-lg font-semibold text-black">
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
                className=" border px-4 py-3 rounded-lg text-sm text-black bg-white hover:text-white hover:bg-black transition-all duration-300 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className=" border px-4 py-3  rounded-lg text-sm text-black bg-white hover:text-white hover:bg-black transition-all duration-300 cursor-pointer"
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
              <p className="text-gray-800 text-sm leading-relaxed">
                {getprofile?.bio}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <p className="label">Gender</p>
                <p className="text-white">{getprofile?.gender}</p>
              </div>

              <div className="card">
                <p className="label">DOB</p>
                <p className="text-white">{getprofile?.date_of_birth?.split("T")[0]}</p>
              </div>
            </div>

            <div className="card">
              <p className="label">Address</p>
              <p className="mt-1 text-sm text-gray-300">
                {getprofile?.address}, {getprofile?.city}
              </p>
              <p className="text-sm text-gray-400">
                {getprofile?.state}, {getprofile?.country} - {getprofile?.pincode}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setEditMode(true)}
          className="flex justify-center items-center border px-4 py-3 w-34 rounded-lg text-sm text-black bg-white hover:text-white hover:bg-black transition-all duration-300 cursor-pointer"
        >
          Edit
        </button>

      </div>
    </div>
    </>
  );
}

export default Navbar;

