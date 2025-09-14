import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productForm, setProductForm] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        isTrending: false,
    });
    const [imageFile, setImageFile] = useState(null); // State for the selected image file
    const { logout } = useAuth();

    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsRes = await axios.get('http://localhost:5000/api/products', { headers });
                setProducts(productsRes.data);
                const ordersRes = await axios.get('http://localhost:5000/api/orders/admin', { headers });
                setOrders(ordersRes.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, [headers]);

    const handleLogout = () => {
        logout();
    };

    const handleMarkComplete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/admin/${id}/complete`, {}, { headers });
            setOrders(orders.map((order) => (order._id === id ? { ...order, status: 'completed' } : order)));
        } catch (err) {
            console.error('Error marking as complete:', err);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProductForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // New function to handle file selection
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Combined function to upload image and then create the product
    const handleAddProduct = async (e) => {
        e.preventDefault();

        // 1. Upload image to Cloudinary first
        let imageUrl = '';
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const res = await axios.post('http://localhost:5000/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                imageUrl = res.data.imageUrl;
            } catch (err) {
                console.error('Image upload failed:', err);
                alert('Image upload failed.');
                return; // Stop execution if image upload fails
            }
        }

        // 2. Create the product with the received imageUrl
        const productData = {
            ...productForm,
            imageUrl: imageUrl,
        };

        try {
            const res = await axios.post('http://localhost:5000/api/products', productData, { headers });
            setProducts([...products, res.data]); // Use the response to get the full product object
            setProductForm({ name: '', description: '', price: '', imageUrl: '', isTrending: false });
            setImageFile(null);
            alert('Product added successfully!');
        } catch (err) {
            console.error('Error adding product:', err);
            alert('Failed to add product.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8 pt-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Product Management Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={productForm.name}
                        onChange={handleFormChange}
                        required
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="number" // Use type number for price
                        name="price"
                        placeholder="Price"
                        value={productForm.price}
                        onChange={handleFormChange}
                        required
                        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={productForm.description}
                        onChange={handleFormChange}
                        className="p-3 border rounded-md col-span-1 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    
                    {/* New file input for image upload */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block mb-2 text-gray-600">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            className="p-3 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        {imageFile && (
                            <p className="mt-2 text-sm text-green-600 truncate">Image selected: {imageFile.name}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isTrending"
                            checked={productForm.isTrending}
                            onChange={handleFormChange}
                            className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                        />
                        <label className="text-gray-600">Mark as Trending</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-teal-500 text-white font-bold py-3 px-6 rounded-full col-span-1 md:col-span-2 hover:bg-teal-600 transition-colors duration-300"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            {/* Orders Management Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Orders</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerDetails.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <span
                                                className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                                                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => handleMarkComplete(order._id)}
                                                    className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 transition-colors duration-300"
                                                >
                                                    Mark Complete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;