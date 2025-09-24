import React, { useState } from "react";
import Pagination from "./Pagination";

const OrdersManager = ({ orders, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginated = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="backdrop-blur-lg bg-white/40 border border-white/30 p-6 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Orders</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white/30 rounded-lg">
          <thead className="bg-gray-100/70">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50/60">
                  <td className="px-6 py-4 text-gray-900">{o.orderId}</td>
                  <td className="px-6 py-4 text-gray-900">{o.customerDetails.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        o.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600"
                    >
                      View
                    </button>
                    {o.status === "pending" && (
                      <button
                        onClick={() => onComplete(o._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-700">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Order #{selectedOrder.orderId}
            </h3>
            <div className="space-y-4 text-left text-gray-900">
              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-semibold border-b pb-1">Customer Info</h4>
                <p><strong>Name:</strong> {selectedOrder.customerDetails.name}</p>
                <p><strong>Email:</strong> {selectedOrder.customerDetails.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.customerDetails.phone}</p>
                <p>
                  <strong>Address:</strong> {selectedOrder.customerDetails.address},{" "}
                  {selectedOrder.customerDetails.state}
                </p>
              </div>

              {/* Items */}
              <div>
                <h4 className="text-lg font-semibold border-b pb-1">Items</h4>
                {selectedOrder.items.map((i) => (
                  <div key={i.productId} className="flex justify-between items-center py-2">
                    <div className="flex items-center space-x-3">
                      <p>{i.name} × {i.quantity}</p>
                    </div>
                    <p>${(i.price * i.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
