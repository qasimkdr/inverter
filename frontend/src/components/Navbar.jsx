import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-fixed">
      <div className="navbar-brand">
        <Link to="/">Inverter</Link>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        &#9776;
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
        <li><Link to="/shops" onClick={toggleMenu}>Shops</Link></li>
        <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contact Us</Link></li>
        <li><Link to="/search" onClick={toggleMenu}>Search</Link></li>
        <li><Link to="/admin/login" onClick={toggleMenu}>Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;