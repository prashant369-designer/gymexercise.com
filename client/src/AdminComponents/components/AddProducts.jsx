import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const AddProducts = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    productName: "",
    productSKU: "",
    productColor: "",
    productPurchasePrice: "",
    productSellingPrice: "",
    productCategory: "",
    productImage: null,
    productInstock: "",
    productSize: "",
    productDescription: "",
  });

  const [preview, setPreview] = useState(null);

  //  Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //  Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.post(
        `${base_url}/products/create`,
        data,{
    headers: {
      Authorization: `Bearer ${token}`, // ✅ IMPORTANT
    },
  }
      );

      console.log(res.data);
      toast("Product Added Successfully ");

      handleClear();
    } catch (error) {
      console.error(error);
      toast("Error submitting form ");
    }
  };

  //  Clear form
  const handleClear = () => {
    setFormData({
      productName: "",
      productSKU: "",
      productColor: "",
      productPurchasePrice: "",
      productSellingPrice: "",
      productCategory: "",
      productImage: null,
      productInstock: "",
      productSize: "",
      productDescription: "",
    });
    setPreview(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Add Inventory</h1>
          <p className="text-gray-500 text-sm">Manage your inventory items</p>
        </div>

        <Link to="/admin/viewproducts">
          <button className="bg-[#C45330] hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer">
            Go to Inventory List
          </button>
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-5"
      >
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>SKU</label>
            <input
              type="text"
              name="productSKU"
              value={formData.productSKU}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Size</label>
            <select
              name="productSize"
              value={formData.productSize}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Size</option>
              <option value="XXL">XXL</option>
              <option value="XL">XL</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="XS">XS</option>
              <option value="other">Other</option>
            </select>

            {formData.productSize === "other" && (
              <input
                type="text"
                name="customSize"
                placeholder="Enter custom size"
                value={formData.customSize || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-2"
              />
            )}
          </div>

          <div>
            <label>Stock</label>
            <input
              type="number"
              name="productInstock"
              value={formData.productInstock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Purchase Price</label>
            <input
              type="number"
              name="productPurchasePrice"
              value={formData.productPurchasePrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label>Selling Price</label>
            <input
              type="number"
              name="productSellingPrice"
              value={formData.productSellingPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="protein">protein</option>
            <option value="mass">mass</option>
            <option value="gainer">gainer</option>
            <option value="vitamins">Vitamins</option>
            <option value="creatine">creatine</option>
            <option value="preworkouts">Preworkouts</option>
            <option value="Fatburner">Fatburner</option>
            <option value="Other">Other</option>
          </select>
          {formData.productCategory === "Other" && (
            <input
              type="text"
              name="customCategory"
              placeholder="Enter custom category"
              value={formData.customCategory || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-2"
            />
          )}
        </div>

        {/* Color */}
        <div>
          <label>Color</label>
          <select
            name="productColor"
            value={formData.productColor}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Color</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
            <option value="Red">Red</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label>Product Image</label>
          <input
            type="file"
            name="productImage"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 mt-2 rounded object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="productDescription"
            rows="4"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="bg-[#C45330] text-white px-5 py-2 rounded cursor-pointer">
            Add Product
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-500 text-white px-5 py-2 rounded cursor-pointer"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
