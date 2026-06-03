import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Faq = () => {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({question: "",answer: ""});
  const base_url = import.meta.env.VITE_API_URL;


  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit faq
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        // Update API
        await axios.put(`${base_url}/faq/update/${editId}`, {
          question: formData.question,
          answer: formData.answer,
        });

        toast("Updated Successfully!");
      } else {
        // Create API
        await axios.post(`${base_url}/faq/create`, {
          question: formData.question,
          answer: formData.answer,
        });

        toast("Submitted Successfully!");
      }

      // Reset form
      setFormData({ question: "", answer: "" });
      setIsEdit(false);
      setEditId(null);
      setOpen(false);

      fetchFaqs();
    } catch (error) {
      console.error(error);
      toast("Something went wrong!");
    }
  };

  // Fetch faqs
  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${base_url}/faq/get`);
      setFaqs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // delete faqs
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/faq/delete/${id}`);
      fetchFaqs();
    } catch (error) {
      console.error(error);
    }
  };

  // update faqs
  const handleEdit = (faq) => {
    setOpen(true);
    setIsEdit(true);
    setEditId(faq.id);

    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">FAQs</h1>
          <p className="text-gray-500 text-sm">
            Manage your FAQs inventory.....
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
            setFormData({ question: "", answer: "" });
          }}
          className="bg-[#C45330] hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add products
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-4">Sr.no</th>
              <th className="text-left p-4">Question</th>
              <th className="text-left p-4">Answer</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {faqs.map((faq, index) => (
              <tr key={faq.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{faq.question}</td>
                <td className="p-4 truncate max-w-97">{faq.answer}</td>
                

                {/* Actions */}
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-gray-600 hover:text-blue-500 py-2 cursor-pointer"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-gray-600 hover:text-red-500 py-2 cursor-pointer"
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
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setIsEdit(false);
                setEditId(null);
                setFormData({ question: "", answer: "" });
              }}
            >
              <IoMdClose className="text-xl" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold">
                {isEdit ? "Edit FAQ" : "Add FAQ"}
              </h1>
              <p className="text-gray-500 text-sm">Manage your FAQ items</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Question */}
              <div>
                <label className="text-sm font-medium">Question</label>
                <input
                  type="text"
                  name="question"
                  placeholder="Enter question"
                  value={formData.question}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 outline-none"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="text-sm font-medium">Answer</label>
                <textarea
                  name="answer"
                  placeholder="Enter answer"
                  rows="3"
                  value={formData.answer}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setIsEdit(false);
                    setEditId(null);
                    setFormData({ question: "", answer: "" });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#C45330] hover:bg-orange-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                >
                  {isEdit ? "Update FAQ" : "Add FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faq;
