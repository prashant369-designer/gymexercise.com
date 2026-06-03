import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const MakeAdmin = () => {
  const [user, setUser] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${base_url}/auth/allusers`);
      setUser(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/auth/deleteuser/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Update user role
  const handleRoleUpdate = async (id, currentRole) => {
    try {
      // toggle role (you can change logic)
      const newRole = currentRole === "admin" ? "user" : "admin";

      await axios.put(`${base_url}/auth/role/${id}`, {
        role: newRole,
      });

      alert("Role updated successfully");

      fetchUsers(); // refresh data
    } catch (error) {
      console.error(error);
      alert("Failed to update role");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">User Profiles</h1>
          <p className="text-gray-500 text-sm">
            Manage your users make admin or remove admin access
          </p>
        </div>
      </div>

      {/* note */}
      <h2 className="text-red-600 text-sm py-2">
        {" "}
        <span className="text-red-600">NOTE:-</span> This is for giving access
        or remove access to user
      </h2>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Action </th>
            </tr>
          </thead>

          <tbody>
            {user.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50 ">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{item.first_name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.role}</td>
                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleRoleUpdate(item.id, item.role)}
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
    </div>
  );
};

export default MakeAdmin;
