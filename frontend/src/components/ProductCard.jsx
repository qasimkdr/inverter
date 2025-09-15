import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="backdrop-blur-lg bg-white/40 border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <motion.div
        className="overflow-hidden rounded-xl mb-4"
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
        {product.description}
      </p>

      {/* Price */}
      <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500 mb-4">
        ${product.price}
      </p>

      {/* Button */}
      <Link
        to="/checkout"
        state={{ product }}
        className="block w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-2 px-4 text-center rounded-full hover:opacity-90 shadow-md transition-all duration-300"
      >
        Order Now
      </Link>
    </motion.div>
  );
};

export default ProductCard;
