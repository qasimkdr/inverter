// src/components/ProductManager.jsx
import React, { useState } from "react";
import Pagination from "./Pagination";

const ProductManager = ({ products, categories, onAdd, onUpdate, onDelete, onAddCategory }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isTrending: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Category dropdown / input
  const handleCategoryChange = (e) => {
    setForm((prev) => ({ ...prev, category: e.target.value }));
  };

  // Handle file upload
  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // If it's a new category, create it before adding product
    if (form.category && !categories.includes(form.category)) {
      onAddCategory(form.category);
    }

    if (isEditing) {
      onUpdate(editId, form, imageFile);
    } else {
      onAdd(form, imageFile);
    }

    // Reset form
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      isTrending: false,
    });
    setImageFile(null);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category || "",
      imageUrl: product.imageUrl,
      isTrending: product.isTrending,
    });
  };

  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h3>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-3 border rounded-md col-span-1 md:col-span-2 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />

        {/* Category Input (Dropdown + Custom) */}
        <input
          list="categories"
          name="category"
          placeholder="Select or type new category"
          value={form.category}
          onChange={handleCategoryChange}
          className="p-3 border rounded-md col-span-1 md:col-span-2 focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        <datalist id="categories">
          {categories.map((cat, idx) => (
            <option key={idx} value={cat} />
          ))}
        </datalist>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="p-3 border rounded-md col-span-1 md:col-span-2 text-gray-900"
        />

        <div className="flex items-center gap-2 col-span-1 md:col-span-2">
          <input
            type="checkbox"
            name="isTrending"
            checked={form.isTrending}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600"
          />
          <label className="text-gray-900">Mark as Trending</label>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-3 px-6 rounded-full col-span-1 md:col-span-2 shadow-md hover:opacity-90 transition"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product Table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full divide-y divide-gray-200 bg-white/30 rounded-lg">
          <thead className="bg-gray-100/70">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Trending</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50/60 text-gray-900">
                <td className="px-6 py-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category || "—"}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.isTrending ? "Yes" : "No"}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};

export default ProductManager;
