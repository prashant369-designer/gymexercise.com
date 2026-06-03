import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Awards = () => {
  const [open, setOpen] = useState(false);
  const [awards, setAwards] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    awardName: "",
    awardDescription: "",
    awardImage: "",
    AwardCertifiedDate: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch Awards
  const fetchAwards = async () => {
    try {
      const res = await axios.get(`${base_url}/awards`);
      setAwards(res.data.awards); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/awards/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/awards/create`,
          formData
        );
        toast("Created Successfully!");
      }

      setOpen(false);
      setIsEdit(false);
      setEditId(null);
      setFormData({
        awardName: "",
        awardDescription: "",
        awardImage: "",
        AwardCertifiedDate: "",
      });

      fetchAwards();
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/awards/delete/${id}`
      );
      fetchAwards();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit
  const handleEdit = (award) => {
    setOpen(true);
    setIsEdit(true);
    setEditId(award.id);

    setFormData({
      awardName: award.awardName,
      awardDescription: award.awardDescription,
      awardImage: award.awardImage,
      AwardCertifiedDate: award.AwardCertifiedDate,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Awards</h1>
          <p className="text-gray-500 text-sm">
            Manage your Awards inventory...
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add Award
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
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {awards.map((award, index) => (
              <tr key={award.id} className="border-t">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                  <img
                    src={award.awardImage}
                    alt=""
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>

                <td className="p-4">{award.awardName}</td>
                <td className="p-4 truncate max-w-xs">
                  {award.awardDescription}
                </td>
                <td className="p-4">{award.AwardCertifiedDate}</td>

                <td className="p-4 flex gap-3">
                  <button className="text-gray-600 hover:text-blue-500 cursor-pointer" onClick={() => handleEdit(award)}>
                    <FiEdit size={18}  />
                  </button>
                  <button className="text-gray-600 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(award.id)}>
                    <FiTrash2 size={18}  />
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
          <div className="bg-white w-full max-w-lg p-6 rounded-xl relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3"
            >
              <IoMdClose />
            </button>

            <h2 className="text-xl mb-4">
              {isEdit ? "Edit Award" : "Add Award"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="awardName"
                placeholder="Award Name"
                value={formData.awardName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="awardDescription"
                placeholder="Description"
                value={formData.awardDescription}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="awardImage"
                placeholder="Image URL"
                value={formData.awardImage}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="AwardCertifiedDate"
                placeholder="Year (e.g. 2025)"
                value={formData.AwardCertifiedDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#C45330] text-white px-4 py-2 rounded cursor-pointer"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Awards;