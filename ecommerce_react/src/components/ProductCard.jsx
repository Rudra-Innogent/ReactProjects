import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";
import "../styles/components/productCard.css";

const ProductCard = ({ product }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    nav("/checkout");
  };

  return (
    <article
      className="product-card"
      onClick={() => nav(`/product/${product.id}`)}
    >
      <div className="card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <h4 className="card-title">{product.title}</h4>
        <p className="card-price">${product.price}</p>

        <div className="card-buttons">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
