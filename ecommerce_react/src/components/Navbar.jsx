import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaBell, FaUser } from "react-icons/fa";
import "../styles/components/navbar.css";

const Navbar = () => { 
  const cart = useSelector((state) => state.cart.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="app-navbar">
      <div className="navbar-left">
        <div className="logo">🛍️ BouTiQueWala</div>
      </div>

      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="icon-btn cart-btn" aria-label="cart">
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <button className="icon-btn bell-btn" aria-label="notifications">
          <FaBell />
        </button>

        <div className="profile-menu-wrapper">
          <button className="icon-btn profile-btn" aria-label="profile">
            <FaUser />
          </button>

          <div className="profile-dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/orders">My Orders</Link>
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
