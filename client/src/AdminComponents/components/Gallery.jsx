import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Gallery = () => {
  const products = [
    {
      name: "Gaming Joy Stick",
      code: "PRD001",
      category: "Electronics",
      brand: "Brand Name",
      price: 99.99,
      unit: "pcs",
      qty: 150,
    },
    {
      name: "Wireless Earphones",
      code: "PRD002",
      category: "Electronics",
      brand: "Tech Pro",
      price: 89.99,
      unit: "pcs",
      qty: 320,
    },
    {
      name: "Smart Watch Pro",
      code: "PRD003",
      category: "Electronics",
      brand: "Tech Pro",
      price: 98.0,
      unit: "pcs",
      qty: 200,
    },
    {
      name: "USB-C Fast Charger",
      code: "PRD004",
      category: "Electronics",
      brand: "Tech Pro",
      price: 86.0,
      unit: "pcs",
      qty: 80,
    },
    {
      name: "Portable Bluetooth Speaker",
      code: "PRD005",
      category: "Electronics",
      brand: "Tech Pro",
      price: 32.0,
      unit: "pcs",
      qty: 110,
    },
    {
      name: "Magic Keyboard",
      code: "PRD006",
      category: "Electronics",
      brand: "Tech Pro",
      price: 49.0,
      unit: "pcs",
      qty: 10,
    },
    {
      name: 'MacBook Pro 16"',
      code: "PRD007",
      category: "Electronics",
      brand: "Tech Pro",
      price: 99.0,
      unit: "pcs",
      qty: 10,
    },
  ];

  return (
    <div className=" min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="text-gray-500 text-sm">
            Manage your products inventory.....
          </p>
        </div>

        <button className="bg-[#C45330] hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
          Add products
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Code</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Brand</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Image + Name */}
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <span className="font-medium">{item.name}</span>
                </td>

                <td className="p-4">{item.code}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.brand}</td>

                {/* Actions */}
                <td className="p-4 flex gap-3">
                  <button className="text-gray-600 hover:text-blue-500 py-2">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-red-500 py-2">
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

export default Gallery;