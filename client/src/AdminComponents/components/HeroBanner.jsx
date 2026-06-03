import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const HeroBanner = () => {
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    BannerHeading: "",
    BannerSubHeading: "",
    BannerDescription: "",
    BannerImage: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch banners
  const fetchBanner = async () => {
    try {
      const res = await axios.get(`${base_url}/heroBanner/get`);
      setBanner(res.data.banner);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/heroBanner/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/heroBanner/create`,
          formData
        );
        toast("Created Successfully!");
      }

      // Reset
      setFormData({
        BannerHeading: "",
        BannerSubHeading: "",
        BannerDescription: "",
        BannerImage: "",
      });

      setOpen(false);
      setIsEdit(false);
      setEditId(null);

      fetchBanner();
    } catch (err) {
      console.error(err);
      toast("No more banner added");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/heroBanner/delete/${id}`
      );
      fetchBanner();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setOpen(true);
    setIsEdit(true);
    setEditId(item.id);

    setFormData({
      BannerHeading: item.BannerHeading,
      BannerSubHeading: item.BannerSubHeading,
      BannerDescription: item.BannerDescription,
      BannerImage: item.BannerImage,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Hero Banner</h1>
          <p className="text-gray-500 text-sm">
            Manage your banner inventory
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
            setFormData({
              BannerHeading: "",
              BannerSubHeading: "",
              BannerDescription: "",
              BannerImage: "",
            });
          }}
          className="bg-[#C45330] hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add Banner
        </button>
      </div>


{/* note */}
<h2 className="text-red-600 text-sm py-2"> <span className="text-red-600">NOTE:-</span> Banner is only editable, no more banner added possible</h2>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Heading</th>
              <th className="p-4 text-left">Subheading</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {banner.map((item, index) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 "
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.BannerHeading}</td>
                <td className="p-4">{item.BannerSubHeading}</td>
                <td className="p-4">{item.BannerDescription}</td>
                <td className="p-4">
                  <img
                    src={item.BannerImage}
                    alt="banner"
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-gray-600 hover:text-blue-500 cursor-pointer"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative">

            {/* Close */}
            <button
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IoMdClose />
            </button>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold">
                {isEdit ? "Edit Banner" : "Add Banner"}
              </h1>
              <p className="text-gray-500 text-sm">
                Manage your banner items
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="BannerHeading"
                placeholder="Heading"
                value={formData.BannerHeading}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <input
                type="text"
                name="BannerSubHeading"
                placeholder="Subheading"
                value={formData.BannerSubHeading}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <textarea
                name="BannerDescription"
                placeholder="Description"
                rows="3"
                value={formData.BannerDescription}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <input
                type="text"
                name="BannerImage"
                placeholder="Image URL"
                value={formData.BannerImage}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#C45330] text-white px-4 py-2 rounded-lg cursor-pointer"
                >
                  {isEdit ? "Update" : "Add"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;