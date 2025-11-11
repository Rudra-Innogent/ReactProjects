import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQty, removeFromCart } from "../store/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/cart.css";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-info">
                <img src={item.image} alt={item.title} />
                <div className="cart-text">
                  <h4>{item.title}</h4>
                </div>
              </div>

              <div className="cart-qty">
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>

              <div className="cart-line-total">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h3>Subtotal: ${subtotal.toFixed(2)}</h3>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
