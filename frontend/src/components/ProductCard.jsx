import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Rotate through these gradients per card
const GRADIENTS = [
  "from-indigo-600 to-teal-500",
  "from-pink-500 to-yellow-500",
  "from-purple-600 to-blue-500",
  "from-green-500 to-emerald-400",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-sky-500",
  "from-fuchsia-500 to-violet-500",
];

const ProductCard = ({ product, index = 0 }) => {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    // Gradient border wrapper
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`group transform-gpu will-change-transform bg-gradient-to-r ${gradient} p-[2px] rounded-2xl shadow-lg hover:shadow-xl transition`}
    >
      {/* Glass card body */}
      <div className="rounded-2xl bg-white/85 backdrop-blur-sm border border-white/50 p-5 h-full flex flex-col">
        {/* Image area (no JS animation to avoid jank) */}
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={(e) => {
              // Fallback image if URL is broken
              e.currentTarget.src =
                "https://via.placeholder.com/600x450?text=No+Image";
            }}
          />
        </div>

        {/* Text content */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-700/90 mb-4 line-clamp-2">
          {product.description || "High efficiency and reliable performance."}
        </p>

        {/* Price chip with gradient background for contrast */}
        <div
          className={`inline-block self-start bg-gradient-to-r ${gradient} text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 shadow`}
        >
          ${Number(product.price).toLocaleString()}
        </div>

        {/* CTA */}
        <Link
          to="/checkout"
          state={{ product }}
          className={`mt-auto text-center bg-gradient-to-r ${gradient} text-white font-bold py-2.5 rounded-full shadow-md hover:opacity-90 transition`}
        >
          Order Now
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
