import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate API call (replace this with your real API endpoint)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => console.error("Error loading product details"));
  }, [id]);

  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-container">
        {/* Left Image Section */}
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
        </div>

        {/* Right Details Section */}
        <div className="product-info-section">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">₹ {Math.round(product.price * 83)}</p>
          <p className="product-category">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="product-description">{product.description}</p>

          <div className="button-group">
            <button
              className="btn add-cart-btn"
              onClick={() => alert("Added to cart!")}
            >
              🛒 Add to Cart
            </button>
            <button
              className="btn buy-now-btn"
              onClick={() => navigate("/checkout")}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
