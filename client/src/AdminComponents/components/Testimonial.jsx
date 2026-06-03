import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Testimonial = () => {
  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    image: "",
    Para: "",
    name: "",
    profession: "",
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${base_url}/testimonial/`);
      setTestimonials(res.data.testimonial);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/testimonial/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/testimonial/create`,
          formData
        );
        toast("Created Successfully!");
      }

      setFormData({
        image: "",
        Para: "",
        name: "",
        profession: "",
      });

      setOpen(false);
      setIsEdit(false);
      setEditId(null);

      fetchTestimonials();
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/testimonial/delete/${id}`
      );
      fetchTestimonials();
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
      image: item.image,
      Para: item.Para,
      name: item.name,
      profession: item.profession,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-gray-500 text-sm">
            Manage your testimonials
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
            setFormData({
              image: "",
              Para: "",
              name: "",
              profession: "",
            });
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Add Testimonial
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Profession</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                  <img
                    src={item.image}
                    alt="user"
                    className="w-14 h-14 object-cover"
                  />
                </td>

                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.profession}</td>
                <td className="p-4 max-w-xs truncate">{item.Para}</td>

                <td className="p-4 flex gap-3">
                  <FiEdit
                    onClick={() => handleEdit(item)}
                    className="cursor-pointer text-blue-500"
                  />
                  <FiTrash2
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 bg-gray-200 p-2 rounded-full"
            >
              <IoMdClose />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit Testimonial" : "Add Testimonial"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              {/* Image Preview */}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-16 h-16 rounded-full"
                />
              )}

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <input
                type="text"
                name="profession"
                placeholder="Profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <textarea
                name="Para"
                placeholder="Message"
                rows="3"
                value={formData.Para}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded-lg"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
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

export default Testimonial;