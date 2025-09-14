import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      login(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      alert('Login failed. Invalid credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-left font-semibold text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-left font-semibold text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-teal-500 text-white p-3 rounded-lg font-bold text-lg hover:bg-teal-600 transition-colors duration-300 transform hover:scale-105">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;