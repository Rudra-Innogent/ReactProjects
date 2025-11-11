// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { fetchProductById, fetchAllProducts } from "../services/api";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import ProductCard from "../components/ProductCard";
import "../styles/pages/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: product, loading } = useFetch(() => fetchProductById(id), [id]);
  const { data: allProducts } = useFetch(fetchAllProducts, []);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [wish, setWish] = useState(false);

  if (loading || !product) return <Loader />;

  const related = allProducts?.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleAddToCart = () =>
    dispatch(addToCart({ ...product, qty }));

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/checkout");
  };

  return (
    <div className="product-detail-page">
      
      {/*  BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="product-detail-container">
        
        {/* LEFT: PRODUCT IMAGE */}
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="detail-info">
          
          <h2>{product.title}</h2>
          <p className="detail-category">{product.category}</p>

          <div className="rating">
             {product.rating.rate} 
            <span className="rating-count"> ({product.rating.count} reviews)</span>
          </div>

          <div className="detail-price">${product.price}</div>

          {/*  QUANTITY SELECTOR */}
          <div className="quantity-box">
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          {/*  ACTION BUTTONS */}
          <div className="detail-actions">
            <button className="btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn-buy" onClick={handleBuyNow}>Buy Now</button>

            {/*  WISHLIST TOGGLE */}
            <button 
              className="btn-wishlist" 
              onClick={() => setWish(!wish)}
              aria-label="wishlist"
            >
              {wish ? "❤️" : "🤍"}
            </button>
          </div>

          {/*  TABS */}
          <div className="tabs">
            <button 
              className={tab === "description" ? "active" : ""} 
              onClick={() => setTab("description")}
            >
              Description
            </button>
            <button 
              className={tab === "specs" ? "active" : ""} 
              onClick={() => setTab("specs")}
            >
              Specifications
            </button>
          </div>

          {/*  TAB CONTENT */}
          {tab === "description" ? (
            <div className="tab-content">{product.description}</div>
          ) : (
            <ul className="specs-list">
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Rating:</strong> {product.rating.rate}</li>
              <li><strong>Reviews:</strong> {product.rating.count}</li>
            </ul>
          )}
        </div>
      </div>

      {/*  RELATED PRODUCTS */}
      {related?.length > 0 && (
        <div className="related-section">
          <h3>Related Products</h3>
          <div className="related-grid">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;

