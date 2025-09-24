// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";
import ProductManager from "../components/ProductManager";
import CarouselManager from "../components/CarouselManager";
import OrdersManager from "../components/OrdersManager";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState({ open: false, type: "success", message: "" });

  const { logout } = useAuth();
  const token = localStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };

  // Fetch products, orders, carousel, categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, carouselRes, categoriesRes] = await Promise.all([
          apiClient.get("/products", { headers }),
          apiClient.get("/orders/admin", { headers }),
          apiClient.get("/carousel"),
          apiClient.get("/categories", { headers }),
        ]);

        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setCarouselImages(carouselRes.data);
        setCategories(categoriesRes.data.map((c) => c.name));
      } catch (err) {
        console.error("Error fetching data:", err);
        showModal("error", "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Helpers
  const showModal = (type, message) => {
    setModal({ open: true, type, message });
    setTimeout(() => setModal({ open: false, type: "", message: "" }), 2500);
  };

  // Products
  const handleAddProduct = async (productData, imageFile) => {
    try {
      let imageUrl = productData.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await apiClient.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", ...headers },
        });
        imageUrl = res.data.imageUrl;
      }

      const res = await apiClient.post("/products", { ...productData, imageUrl }, { headers });
      setProducts((prev) => [...prev, res.data]);
      showModal("success", "Product added successfully!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to add product");
    }
  };

  const handleUpdateProduct = async (id, productData, imageFile) => {
    try {
      let imageUrl = productData.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await apiClient.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", ...headers },
        });
        imageUrl = res.data.imageUrl;
      }

      const res = await apiClient.put(`/products/${id}`, { ...productData, imageUrl }, { headers });
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      showModal("success", "Product updated successfully!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to update product");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await apiClient.delete(`/products/${id}`, { headers });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showModal("success", "Product deleted successfully!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to delete product");
    }
  };

  // Categories
  const handleAddCategory = async (name) => {
    try {
      const res = await apiClient.post("/categories", { name }, { headers });
      setCategories((prev) => [...prev, res.data.name]);
      showModal("success", "Category added successfully!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to add category");
    }
  };

  // Carousel
  const handleAddCarousel = async (imageFile) => {
    try {
      if (!imageFile) return;
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data", ...headers },
      });

      const newImage = await apiClient.post(
        "/carousel",
        { imageUrl: res.data.imageUrl },
        { headers }
      );

      setCarouselImages((prev) => [...prev, newImage.data]);
      showModal("success", "Carousel image added!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to add carousel image");
    }
  };

  const handleDeleteCarousel = async (id) => {
    try {
      await apiClient.delete(`/carousel/${id}`, { headers });
      setCarouselImages((prev) => prev.filter((img) => img._id !== id));
      showModal("success", "Carousel image deleted!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to delete carousel image");
    }
  };

  // Orders
  const handleCompleteOrder = async (id) => {
    try {
      await apiClient.put(`/orders/admin/${id}/complete`, {}, { headers });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: "completed" } : o)));
      showModal("success", "Order marked as complete!");
    } catch (err) {
      console.error(err);
      showModal("error", "Failed to complete order");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen p-6 pt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Admin Dashboard</h2>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

      {/* Managers */}
      <ProductManager
        products={products}
        categories={categories}
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        onAddCategory={handleAddCategory}
      />

      <CarouselManager
        carouselImages={carouselImages}
        onAdd={handleAddCarousel}
        onDelete={handleDeleteCarousel}
      />

      <OrdersManager orders={orders} onComplete={handleCompleteOrder} />

      {/* Glassy Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div
            className={`p-6 rounded-2xl shadow-xl text-white text-center ${
              modal.type === "success"
                ? "bg-green-600/90"
                : "bg-red-600/90"
            }`}
          >
            <p className="text-lg font-semibold">{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
