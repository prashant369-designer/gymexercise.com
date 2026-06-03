import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";


const WelcomeGym = () => {
  const [open, setOpen] = useState(false);
  const [gymData, setGymData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    heading: "",
    subheading: "",
    description: "",
    leftImage: "",
    rightImage: "",
    brandLogos: "",
  });

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get(`${base_url}/welcomegym/`);
      setGymData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(
          `${base_url}/welcomegym/update/${editId}`,
          formData
        );
        toast("Updated Successfully!");
      } else {
        await axios.post(
          `${base_url}/welcomegym/create`,
          formData
        );
        toast("Created Successfully!");
      }

      setFormData({
        heading: "",
        subheading: "",
        description: "",
        leftImage: "",
        rightImage: "",
        brandLogos: "",
      });

      setIsEdit(false);
      setEditId(null);
      setOpen(false);

      fetchData();
    } catch (err) {
      console.error(err);
      toast("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${base_url}/welcomegym/delete/${id}`
      );
      fetchData();
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
      heading: item.heading,
      subheading: item.subheading,
      description: item.description,
      leftImage: item.leftImage,
      rightImage: item.rightImage,
      brandLogos: item.brandLogos,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Welcome Gym</h1>
          <p className="text-gray-500 text-sm">
            Manage Welcome Gym Section
          </p>
        </div>

        <button
          onClick={() => {
            setOpen(true);
            setIsEdit(false);
            setEditId(null);
            setFormData({
              heading: "",
              subheading: "",
              description: "",
              leftImage: "",
              rightImage: "",
              brandLogos: "",
            });
          }}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg"
        >
          Add Section
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Heading</th>
              <th className="p-2 text-left">Subheading</th>
              <th className="p-2 text-left">Images</th>
              <th className="p-2 text-left">Brands</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gymData?.map((item, index) => {
              const brands = item.brandLogos
                ? JSON.parse(item.brandLogos)
                : [];

              return (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.heading}</td>
                  <td className="p-2">{item.subheading}</td>

                  {/* Images */}
                  <td className="p-2 flex gap-2">
                    <img
                      src={item.leftImage}
                      className="w-12 h-10 object-cover rounded"
                    />
                    <img
                      src={item.rightImage}
                      className="w-12 h-10 object-cover rounded"
                    />
                  </td>

                  {/* Brands */}
                  <td className="p-2 flex gap-2">
                    {brands.map((b, i) => (
                      <img
                        key={i}
                        src={b.logo}
                        title={b.name}
                        className="w-8 h-8 object-contain"
                      />
                    ))}
                  </td>

                  {/* Actions */}
                  <td className="p-2 flex gap-3">
                    <button className="hover:text-blue-500 cursor-pointer"  onClick={() => handleEdit(item)}>
                      <FiEdit />
                    </button>

                    <button className="hover:text-red-500 cursor-pointer" onClick={() => handleDelete(item.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
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
              {isEdit ? "Edit Section" : "Add Section"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="heading"
                placeholder="Heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="subheading"
                placeholder="Subheading"
                value={formData.subheading}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="leftImage"
                placeholder="Left Image URL"
                value={formData.leftImage}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="rightImage"
                placeholder="Right Image URL"
                value={formData.rightImage}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="brandLogos"
                placeholder='Brand Logos JSON [{"name":"Nike","logo":"url"}]'
                value={formData.brandLogos}
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

export default WelcomeGym;