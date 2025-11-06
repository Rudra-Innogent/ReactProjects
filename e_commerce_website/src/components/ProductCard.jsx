// src/components/ProductCard.jsx
import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.title} />
      <div className="card-info">
        <h4 className="product-title">{product.title}</h4>
        <p className="price">₹{product.price}</p>
        <div className="action-buttons">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
