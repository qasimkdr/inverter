import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import apiClient from "../api/apiClient"; // axios instance

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  // 🔍 Fetch live results with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/products?search=${encodeURIComponent(searchQuery)}`);
        setResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce: 400ms

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Go to products page with search results
  const handleResultClick = (product) => {
    setSearchQuery("");
    setResults([]);
    setIsSearchOpen(false);
    navigate(`/products/${product._id}`, { state: { product } });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-700">
          INVDT
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium text-gray-800">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
          <li><Link to="/products" className="hover:text-indigo-600">Products</Link></li>
          <li><Link to="/shops" className="hover:text-indigo-600">Shops</Link></li>
          <li><Link to="/about" className="hover:text-indigo-600">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600">Contact Us</Link></li>
        </ul>

        {/* Desktop Search + Login */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 text-gray-700 rounded-full w-56 border bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {loading && (
              <span className="absolute right-3 top-2 text-gray-400 text-sm">...</span>
            )}

            {/* Results dropdown */}
            {results.length > 0 && (
              <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-64 max-h-64 overflow-y-auto z-50">
                {results.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => handleResultClick(p)}
                    className="flex items-center w-full text-left px-3 py-2 hover:bg-indigo-50"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/admin/login"
            className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleSearch} className="text-gray-700">
            <Search size={26} />
          </button>
          <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md text-gray-800 px-6 py-3 shadow-md relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-2 w-full border rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {loading && <p className="text-sm text-gray-400 mt-1">Searching...</p>}
            {results.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg w-full max-h-64 overflow-y-auto z-50">
                {results.map((p) => (
                  <button
                    key={p._id}
                    onClick={() => handleResultClick(p)}
                    className="flex items-center w-full text-left px-3 py-2 hover:bg-indigo-50"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md text-gray-800 px-6 py-4 space-y-4 shadow-lg"
          >
            <Link to="/" onClick={toggleMenu} className="block hover:text-indigo-600">Home</Link>
            <Link to="/products" onClick={toggleMenu} className="block hover:text-indigo-600">Products</Link>
            <Link to="/shops" onClick={toggleMenu} className="block hover:text-indigo-600">Shops</Link>
            <Link to="/about" onClick={toggleMenu} className="block hover:text-indigo-600">About Us</Link>
            <Link to="/contact" onClick={toggleMenu} className="block hover:text-indigo-600">Contact Us</Link>
            <Link
              to="/admin/login"
              onClick={toggleMenu}
              className="block px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition text-center"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
