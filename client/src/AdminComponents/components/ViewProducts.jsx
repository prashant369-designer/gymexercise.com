import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;
  const image_url = import.meta.env.VITE_API_URL_IMAGE;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    productImage: "",
    productName: "",
    productSKU: "",
    productInstock: "",
    productSize: "",
    productColor: "",
    productDescription: "",
    productPurchasePrice: "",
    productSellingPrice: "",
    productCategory: "",
  });

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${base_url}/products/getadmin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  //  Open Edit Modal
  const handleEditClick = (item) => {
    setFormData(item);
    setEditId(item.id);
    setOpen(true);
  };

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${base_url}/products/update/${editId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast("Product Updated Successfully!");

      setOpen(false);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Update error:", err);
      toast("Update failed!");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-gray-500 text-sm">Manage your products inventory</p>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">S.no</th>
              <th className="p-4">Image & Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Size</th>
              <th className="p-4">Color</th>
              <th className="p-4">Description</th>
              <th className="p-4">Purchase</th>
              <th className="p-4">Selling</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>

                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`${image_url}/${item.productImage}`}
                    alt=""
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span>{item.productName}</span>
                </td>

                <td className="p-4">{item.productCategory}</td>
                <td className="p-4">{item.productSKU}</td>
                <td className="p-4">{item.productInstock}</td>
                <td className="p-4">{item.productSize}</td>
                <td className="p-4">{item.productColor}</td>

                <td className="p-4 truncate max-w-37">
                  {item.productDescription}
                </td>

                <td className="p-4">₹{item.productPurchasePrice}</td>
                <td className="p-4">₹{item.productSellingPrice}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    <FiEdit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-150 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="productSKU"
                value={formData.productSKU}
                onChange={handleChange}
                placeholder="SKU"
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="productInstock"
                value={formData.productInstock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="productSize"
                value={formData.productSize}
                onChange={handleChange}
                placeholder="Size"
                className="w-full border p-2 rounded"
              />

              <input
                type="text"
                name="productColor"
                value={formData.productColor}
                onChange={handleChange}
                placeholder="Color"
                className="w-full border p-2 rounded"
              />

              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="productPurchasePrice"
                value={formData.productPurchasePrice}
                onChange={handleChange}
                placeholder="Purchase Price"
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="productSellingPrice"
                value={formData.productSellingPrice}
                onChange={handleChange}
                placeholder="Selling Price"
                className="w-full border p-2 rounded"
              />

              {/* BUTTONS */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
