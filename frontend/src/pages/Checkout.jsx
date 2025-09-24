// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    description: "",
  });
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newOrderId, setNewOrderId] = useState("");

  useEffect(() => {
    if (location.state && location.state.product) {
      setProduct(location.state.product);
    } else {
      navigate("/products");
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleProceedToOrder = (e) => {
    e.preventDefault();
    setShowReviewModal(true);
  };

  const handleConfirmOrder = async () => {
    if (!product) return;

    const orderData = {
      items: [
        {
          productId: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          quantity,
          price: product.price,
        },
      ],
      customerDetails,
    };

    try {
      const res = await apiClient.post("/orders", orderData);
      setNewOrderId(res.data.orderId);
      setShowReviewModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      alert("Error placing order.");
      console.error(err);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500">Redirecting...</p>
      </div>
    );
  }

  const total = product.price * quantity;

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen flex flex-col items-center py-12 pt-20">
      {/* Glassy Checkout Card */}
      <div className="backdrop-blur-lg bg-white/40 border border-white/30 p-10 rounded-2xl shadow-2xl w-full max-w-3xl">

        {/* Product Section */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-6 text-indigo-700">
            Product Details
          </h3>
          <div className="flex flex-col items-center mb-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-80 h-80 object-contain rounded-xl shadow-md mb-6 bg-white"
            />
            <div className="text-center">
              {/* Product Name */}
              <h4 className="font-bold text-2xl text-indigo-800">{product.name}</h4>

              {/* Product Description */}
              <p
                className="text-gray-700 text-base mt-4 whitespace-pre-line text-left"
                dangerouslySetInnerHTML={{
                  __html: product.description.replace(/\n/g, "<br />"),
                }}
              ></p>
            </div>
          </div>
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-lg font-medium">
              <span>Price:</span>
              <span className="text-indigo-600 font-bold">
                PKR {product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <label className="font-medium" htmlFor="quantity">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 border rounded-lg text-lg text-center focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4">
              <span>Total:</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                PKR {total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <form
          onSubmit={handleProceedToOrder}
          className="flex flex-col space-y-4"
        >
          <h3 className="text-2xl font-semibold mb-4 text-indigo-700">
            Customer Details
          </h3>
          <input
            type="text"
            name="name"
            value={customerDetails.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            name="email"
            value={customerDetails.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="tel"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            name="state"
            value={customerDetails.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            name="description"
            value={customerDetails.description}
            onChange={handleChange}
            placeholder="Special Instructions (Optional)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:opacity-90 transition"
          >
            Proceed to Order
          </button>
        </form>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Review Your Order
            </h3>
            <div className="text-left space-y-2 text-gray-700">
              <p><strong>Item:</strong> {product.name}</p>
              <p><strong>Quantity:</strong> {quantity}</p>
              <p><strong>Total:</strong> PKR {total.toFixed(2)}</p>
              <p><strong>Name:</strong> {customerDetails.name}</p>
              <p><strong>Email:</strong> {customerDetails.email}</p>
              <p><strong>Phone:</strong> {customerDetails.phone}</p>
              <p><strong>Address:</strong> {customerDetails.address}, {customerDetails.state}</p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowReviewModal(false)}
                className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              🎉 Order Placed!
            </h3>
            <p className="text-gray-700 mb-2">
              Your Order ID is:{" "}
              <span className="font-bold text-indigo-600">{newOrderId}</span>
            </p>
            <p className="text-gray-600 mb-6">
              Our team will contact you in less than 24 hrs to confirm your order.
            </p>
            <button
              onClick={handleCloseSuccessModal}
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
