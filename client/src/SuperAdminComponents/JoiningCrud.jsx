import { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function JoiningCrudApp() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const base_url = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    joining_date: "",
    expiring_date: "",
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${base_url}/joiningcrud`);
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`${base_url}/joiningcrud/${editId}`, formData);
        toast.success("Updated Successfully!");
      } else {
        await axios.post(`${base_url}/joiningcrud`, formData);
        toast.success("Created Successfully!");
        console.log("Created user with data:", formData);
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/joiningcrud/${id}`);
      toast.success("Deleted Successfully!");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setOpen(true);
    setIsEdit(true);
    setEditId(item.id);

    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      joining_date: item.joining_date?.split("T")[0],
      expiring_date: item.expiring_date?.split("T")[0],
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      joining_date: "",
      expiring_date: "",
    });
    setIsEdit(false);
    setEditId(null);
    setOpen(false);
  };

  const getStatus = (expiringDate) => {
    const today = new Date();
    const exp = new Date(expiringDate);

    const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return "Expired";
    if (diff <= 3) return "Expiring Soon";
    return "Active";
  };

  const sendMailAPI = async (id) => {
    try {
      await axios.post(`${base_url}/joiningcrud/sendmail/${id}`);
      console.log("Mail sent to user:", id);
      toast.success("Mail sent successfully!");
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Joining</h1>
          <p className="text-gray-500 text-sm">Manage your Joining content</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#C45330] text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Joining</th>
              <th className="p-3">Expiring</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
              <th className="p-3">Notified</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  {new Date(user.joining_date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(user.expiring_date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span className="text-xs text-center">
                    {getStatus(user.expiring_date)}

                    {getStatus(user.expiring_date) !== "Active" && (
                      <button
                        onClick={() => sendMailAPI(user.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer ml-2 text-xs"
                      >
                        Send Reminder Mail
                      </button>
                    )}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-gray-600 hover:text-blue-500 cursor-pointer"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
                <td className="p-3">{user.notified ? "Yes" : "No"}</td>
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
              className="absolute top-3 right-3 cursor-pointer"
              onClick={resetForm}
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-xl mb-4">
              {isEdit ? "Edit User" : "Add User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="date"
                name="expiring_date"
                value={formData.expiring_date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <button className="bg-[#C45330] text-white px-4 py-2 rounded w-full cursor-pointer">
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default JoiningCrudApp;
