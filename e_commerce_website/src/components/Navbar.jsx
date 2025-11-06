import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">🛍️ BouTiQueWaLa</Link>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>

      {/* Icons */}
      <div className="nav-icons">
        <FaBell className="icon" title="Notifications" />
        <FaShoppingCart className="icon" title="Cart" />
        <FaUserCircle className="icon" title="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
