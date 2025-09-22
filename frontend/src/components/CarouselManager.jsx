// src/components/CarouselManager.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient"; 
import Pagination from "./Pagination";

const CarouselManager = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newImageFile, setNewImageFile] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(carouselImages.length / itemsPerPage);
  const paginated = carouselImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch carousel images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiClient.get("/carousel");
        setCarouselImages(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };
    fetchImages();
  }, []);

  // Handle file input
  const handleFileChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  // Upload image
  const handleAddImage = async () => {
    if (!newImageFile) return;

    const formData = new FormData();
    formData.append("image", newImageFile); // ✅ must be "image"

    try {
      const token = localStorage.getItem("adminToken"); 
      const response = await apiClient.post("/carousel", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setCarouselImages([...carouselImages, response.data]);
      setNewImageFile(null);
      setShowAddModal(false);
    } catch (error) {
      console.error("❌ Error adding image:", error.response || error);
    }
  };

  // Delete image
  const handleDeleteImage = async (imageId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await apiClient.delete(`/carousel/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCarouselImages(carouselImages.filter((img) => img._id !== imageId));
      setConfirmDelete(null);
    } catch (error) {
      console.error("❌ Error deleting image:", error.response || error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-teal-50 border border-gray-200 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Carousel Images
      </h3>

      {/* Add Image Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600 mb-4"
      >
        Add Image
      </button>

      {/* Images Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {paginated.map((img) => (
          <div
            key={img._id}
            className="relative group rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
          >
            <img
              src={img.imageUrl}
              alt="Carousel"
              className="w-full h-40 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => setConfirmDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-700 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <h4 className="text-lg font-bold mb-4">Delete this image?</h4>
            <div className="space-x-4">
              <button
                onClick={() => handleDeleteImage(confirmDelete)}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-300 px-5 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <h4 className="text-lg font-bold mb-4">Add a New Image</h4>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
              <div className="space-x-4">
                <button
                  onClick={handleAddImage}
                  className="bg-teal-500 text-white px-5 py-2 rounded-full hover:bg-teal-600 transition"
                >
                  Upload
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 px-5 py-2 rounded-full hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselManager;
