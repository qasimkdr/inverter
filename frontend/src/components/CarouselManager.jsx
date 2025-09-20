import React, { useState } from "react";
import Pagination from "./Pagination";

const CarouselManager = ({ carouselImages, onAdd, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(carouselImages.length / itemsPerPage);
  const paginated = carouselImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-teal-50 border border-gray-200 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Carousel Images
      </h3>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {paginated.map((img) => (
          <div
            key={img._id}
            className="relative group rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
          >
            {/* Image (contain to avoid cropping) */}
            <img
              src={img.imageUrl}
              alt="Carousel"
              className="w-full h-40 object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />

            {/* Delete button on hover */}
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
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center w-full max-w-sm">
            <h4 className="text-lg font-bold mb-4 text-gray-800">
              Delete this image?
            </h4>
            <div className="space-x-4">
              <button
                onClick={() => {
                  onDelete(confirmDelete);
                  setConfirmDelete(null);
                }}
                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselManager;
