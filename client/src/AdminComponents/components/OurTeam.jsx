import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Mentor = () => {
  const [open, setOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    mentorName: "",
    mentorBio: "",
    mentorExperties: "",
    mentorImage: "",
    mentorFacebook: "",
    mentorInsta: "",
    mentorYoutube: "",
  });

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch mentors
  const fetchMentors = async () => {
    try {
      const res = await axios.get(`${base_url}/mentor`);
      setMentors(res.data.mentor); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/mentor/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/mentor/create`,
          formData
        );
        toast("Created Successfully!");
      }

      setOpen(false);
      setIsEdit(false);
      setEditId(null);

      setFormData({
        mentorName: "",
        mentorBio: "",
        mentorExperties: "",
        mentorImage: "",
        mentorFacebook: "",
        mentorInsta: "",
        mentorYoutube: "",
      });

      fetchMentors();
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/mentor/delete/${id}`
      );
      fetchMentors();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit
  const handleEdit = (mentor) => {
    setOpen(true);
    setIsEdit(true);
    setEditId(mentor.id);

    setFormData({
      mentorName: mentor.mentorName,
      mentorBio: mentor.mentorBio,
      mentorExperties: mentor.mentorExperties,
      mentorImage: mentor.mentorImage,
      mentorFacebook: mentor.mentorFacebook,
      mentorInsta: mentor.mentorInsta,
      mentorYoutube: mentor.mentorYoutube,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Mentors</h1>
          <p className="text-gray-500 text-sm">
            Manage your mentor list...
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Add Mentor
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
              <th className="p-4 text-left">Expertise</th>
              <th className="p-4 text-left">Bio</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mentors.map((mentor, index) => (
              <tr key={mentor.id} className="border-t">
                <td className="p-4">{index + 1}</td>

                <td className="p-4">
                  <img
                    src={mentor.mentorImage}
                    alt=""
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>

                <td className="p-4">{mentor.mentorName}</td>
                <td className="p-4">{mentor.mentorExperties}</td>
                <td className="p-4 truncate max-w-xs">
                  {mentor.mentorBio}
                </td>

                <td className="p-4 flex gap-3">
                  <button onClick={() => handleEdit(mentor)}>
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDelete(mentor.id)}>
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
          <div className="bg-white w-full max-w-lg p-6 rounded-xl relative">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3"
            >
              <IoMdClose />
            </button>

            <h2 className="text-xl mb-4">
              {isEdit ? "Edit Mentor" : "Add Mentor"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="text"
                name="mentorName"
                placeholder="Name"
                value={formData.mentorName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="mentorBio"
                placeholder="Bio"
                value={formData.mentorBio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="mentorExperties"
                placeholder="Expertise"
                value={formData.mentorExperties}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="mentorImage"
                placeholder="Image URL"
                value={formData.mentorImage}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="mentorFacebook"
                placeholder="Facebook URL"
                value={formData.mentorFacebook}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="mentorInsta"
                placeholder="Instagram URL"
                value={formData.mentorInsta}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="mentorYoutube"
                placeholder="YouTube URL"
                value={formData.mentorYoutube}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#C45330] text-white px-4 py-2 rounded"
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

export default Mentor;