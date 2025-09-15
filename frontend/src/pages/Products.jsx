import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../api/apiClient";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const endpoint = query
          ? `/products?search=${encodeURIComponent(query)}`
          : `/products`;
        const res = await apiClient.get(endpoint);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {query ? `Search Results for "${query}"` : "All Products"}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Products;
