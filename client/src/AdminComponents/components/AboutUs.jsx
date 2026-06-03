import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const AboutUs = () => {
  
  const [open, setOpen] = useState(false);
  const [aboutList, setAboutList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;

  

  const [formData, setFormData] = useState({
    AboutHeading: "",
    AboutDescription: "",
    AboutImage: "",
    AboutButton: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch AboutUs data
  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${base_url}/aboutus/`);
      setAboutList(res.data.AboutUs); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/aboutus/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/aboutus/create`,
          formData
        );
        toast("Created Successfully!");
      }

      setFormData({
        AboutHeading: "",
        AboutDescription: "",
        AboutImage: "",
        AboutButton: "",
      });

      setIsEdit(false);
      setEditId(null);
      setOpen(false);

      fetchAbout();
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/aboutus/delete/${id}`
      );
      fetchAbout();
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
      AboutHeading: item.AboutHeading,
      AboutDescription: item.AboutDescription,
      AboutImage: item.AboutImage,
      AboutButton: item.AboutButton,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">About Us</h1>
          <p className="text-gray-500 text-sm">
            Manage your About Us content
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
            setFormData({
              AboutHeading: "",
              AboutDescription: "",
              AboutImage: "",
              AboutButton: "",
            });
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Add About
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Heading</th>
              <th className="p-4">Description</th>
              <th className="p-4">Image</th>
              <th className="p-4">Button</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {aboutList?.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.AboutHeading}</td>
                <td className="p-4 truncate max-w-xs">
                  {item.AboutDescription}
                </td>

                <td className="p-4">
                  <img
                    src={item.AboutImage}
                    alt=""
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>

                <td className="p-4">{item.AboutButton}</td>

                <td className="p-4 flex gap-3">
                  <button onClick={() => handleEdit(item)}>
                    <FiEdit />
                  </button>

                  <button onClick={() => handleDelete(item.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              <IoMdClose />
            </button>

            <h2 className="text-xl mb-4">
              {isEdit ? "Edit About" : "Add About"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="AboutHeading"
                placeholder="Heading"
                value={formData.AboutHeading}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="AboutDescription"
                placeholder="Description"
                value={formData.AboutDescription}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="AboutImage"
                placeholder="Image URL"
                value={formData.AboutImage}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="AboutButton"
                placeholder="Button Text"
                value={formData.AboutButton}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <button className="bg-[#C45330] text-white px-4 py-2 rounded">
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;