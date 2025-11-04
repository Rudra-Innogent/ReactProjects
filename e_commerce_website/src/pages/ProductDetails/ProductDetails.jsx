import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="product-details-page">
      <div className="product-detail-card">
        <div className="product-detail-image-section">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-img"
          />
        </div>

        <div className="product-detail-info">
          <h2 className="product-detail-title">{product.title}</h2>
          <p className="product-detail-price">₹ {product.price}</p>
          <p className="product-detail-category">
            <b>Category:</b> {product.category}
          </p>

          <div className="action-buttons">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          <p className="product-detail-description">{product.description}</p>

          <button
            className="product-detail-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
