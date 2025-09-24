import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ no `.jsx`
import apiClient from "../api/apiClient";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await apiClient.post("/admin/login", { username, password });

      if (res.data && res.data.token) {
        login(res.data.token);
        navigate("/admin/dashboard");
      } else {
        setErrorMsg("Login failed: No token received.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("Invalid credentials or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-4">
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 p-10 rounded-2xl shadow-2xl w-full max-w-md text-center transition-all duration-300 hover:scale-105 hover:shadow-3xl">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
          Admin Login
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded-lg mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="text-left">
            <label
              className="block font-semibold text-gray-900 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="text-left">
            <label
              className="block font-semibold text-gray-900 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/70 backdrop-blur-sm text-gray-900 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:from-teal-600 hover:to-teal-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
