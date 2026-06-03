import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [preview, setPreview] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    BlogImage: "",
    BlogHeading: "",
    BlogSubHeading: "",
    BlogComments: "",
    blogpara: "",
  });


  const fetchblogs = async () => {
    try {
      const res = await axios.get(`${base_url}/blog`);
      setBlogs(res.data.blog);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchblogs();
  }, []);

  //  Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //  Handle Edit
  const handleEdit = (item) => {
    setFormData({
      BlogImage: item.BlogImage,
      BlogHeading: item.BlogHeading,
      BlogSubHeading: item.BlogSubHeading,
      BlogComments: item.BlogComments,
      blogpara: item.blogpara,
    });

    setPreview(item.BlogImage);
    setEditId(item.id);
    setIsEdit(true);
    setOpen(true);
  };

  // Submit (Add + Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      // skip old image URL in edit mode
      if (key === "BlogImage" && typeof value === "string") return;

      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/blog/update/${editId}`,
          data
        );
        toast("Blog Updated Successfully");
      } else {
        await axios.post(
          `${base_url}/blog/create`,
          data
        );
        toast("Blog Added Successfully");
      }

      fetchblogs();
      handleClear();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast("Error submitting form");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/blog/delete/${id}`);
      fetchblogs();
    } catch (error) {
      console.error(error);
    }
  };

  //  Clear form
  const handleClear = () => {
    setFormData({
      BlogImage: "",
      BlogHeading: "",
      BlogSubHeading: "",
      BlogComments: "",
      blogpara: "",
    });
    setPreview(null);
    setIsEdit(false);
    setEditId(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Blogs</h1>
          <p className="text-gray-500 text-sm">
            Manage your Blogs inventory.....
          </p>
        </div>

        <button
          onClick={() => {
            handleClear();
            setOpen(true);
          }}
          className="bg-[#C45330] hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add Blogs
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Heading</th>
              <th className="p-4 text-left">Sub Heading</th>
              <th className="p-4 text-left">Para</th>
              <th className="p-4 text-left">Comments</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={item.BlogImage}
                    alt="blog"
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                <td className="p-4">{item.BlogHeading}</td>
                <td className="p-4">{item.BlogSubHeading}</td>
                <td className="p-4 max-w-lg truncate">{item.blogpara}</td>
                <td className="p-4">{item.BlogComments}</td>

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
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full"
            >
              <IoMdClose />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit Blog" : "Add Blog"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                name="BlogHeading"
                value={formData.BlogHeading}
                onChange={handleChange}
                placeholder="Heading"
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                name="BlogSubHeading"
                value={formData.BlogSubHeading}
                onChange={handleChange}
                placeholder="Sub Heading"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="file"
                name="BlogImage"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />

              {/* Image Preview */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <textarea
                name="blogpara"
                value={formData.blogpara}
                onChange={handleChange}
                placeholder="Paragraph"
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="text"
                name="BlogComments"
                value={formData.BlogComments}
                onChange={handleChange}
                placeholder="Comments"
                className="w-full border px-3 py-2 rounded"
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
                  {isEdit ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;