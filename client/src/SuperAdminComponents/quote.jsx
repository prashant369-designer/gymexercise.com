import React from "react";
import { FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { useState, useEffect } from "react";

const Enquiry = () => {
  const [enquiry, setEnquiry] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  // fetch data
  const fetchEnquiry = async () => {
    try {
      const response = await axios.get(`${base_url}/quotes`);
      setEnquiry(response.data.quote);
    } catch (err) {
      console.log(err);
    }
  };

  // delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/quotes/delete/${id}`);
      fetchEnquiry();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, []);

  return (
    <div className=" min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Quote Field</h1>
          <p className="text-gray-500 text-sm">
            Check, Who have the quote and need to ask some.....
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-4">S.no</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">Message</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {enquiry.map((item, index) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  {item.name} 
                </td>
                <td className="p-4">{item.email}</td>
                <td className="p-4">{item.phone}</td>
                <td className="p-4">{item.message}</td>

                {/* Actions */}
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(item.id)}
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
    </div>
  );
};

export default Enquiry;
