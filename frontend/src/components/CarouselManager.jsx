import React, { useState } from "react";
import Pagination from "./Pagination";

const CarouselManager = ({ carouselImages, onAdd, onDelete }) => {
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(carouselImages.length / itemsPerPage);
  const paginated = carouselImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 p-6 rounded-2xl shadow-xl mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Carousel Images</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paginated.map((img) => (
          <div key={img._id} className="relative group">
            <img src={img.imageUrl} alt="Carousel" className="w-full h-32 object-cover rounded-lg shadow" />
            <button
              onClick={() => setConfirmDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h4 className="text-lg font-bold mb-4">Delete this image?</h4>
            <div className="space-x-4">
              <button onClick={() => { onDelete(confirmDelete); setConfirmDelete(null); }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes</button>
              <button onClick={() => setConfirmDelete(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselManager;
