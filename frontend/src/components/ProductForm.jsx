import React, { useState } from "react";

const ProductForm = ({ onAdd, onUpdate, isEditing, productForm, setProductForm, imageFile, setImageFile }) => {
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onUpdate();
    } else {
      onAdd();
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleFormChange}
          required
          className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleFormChange}
          required
          className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productForm.description}
          onChange={handleFormChange}
          className="p-3 border rounded-md col-span-1 md:col-span-2 focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border rounded-md col-span-1 md:col-span-2"
        />
        <div className="flex items-center gap-2 col-span-1 md:col-span-2">
          <input
            type="checkbox"
            name="isTrending"
            checked={productForm.isTrending}
            onChange={handleFormChange}
            className="w-4 h-4 text-indigo-600"
          />
          <label className="text-gray-700">Mark as Trending</label>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-3 px-6 rounded-full col-span-1 md:col-span-2 shadow-md hover:opacity-90 transition"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
