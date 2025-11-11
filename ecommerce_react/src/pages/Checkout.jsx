import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {clearCart, removeFromCart, addToCart,decreaseQty,} from "../store/CartSlice";
import "../styles/pages/checkout.css";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [promo, setPromo] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = subtotal * discountPercent;
  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promo.toLowerCase() === "save10") {
      setDiscountPercent(0.1);
      alert(" Promo Applied: 10% OFF");
    } else {
      alert(" Invalid Promo Code");
    }
  };

  // Create order using Spring Boot backend
  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty. Please add items to place an order.");
      return;
    }
    
    if (!address.name || !address.phone || !address.addressLine || !address.city || !address.pincode) {
      alert(" Please fill your delivery address before placing an order.");
      return;
    }

    setLoading(true);

    try {
      // Transform frontend order data to backend format
      const orderData = {
        id: Date.now(), // Order ID from frontend
        name: address.name, // From address container
        contactNumber: address.phone, // From address container
        address: {
          name: address.name,
          phone: address.phone,
          addressLine: address.addressLine,
          city: address.city,
          pincode: address.pincode
        },
        items: cart.map(item => ({
          id: item.id, // Product ID (itemId)
          title: item.title,
          image: item.image,
          price: item.price,
          qty: item.qty // Quantity
        })),
        total: total
      };

      // Call backend API to create order
      await createOrder(orderData);

      dispatch(clearCart());
      alert(" Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      {/* LEFT SECTION */}
      <div className="checkout-left">
        <h2>Your Items</h2>
        <div className="checkout-items-box">
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <div className="checkout-item-info">
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                </div>
              </div>

              <div className="checkout-qty">
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => dispatch(addToCart(item))}>+</button>
              </div>

              <div className="checkout-price">
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="checkout-right">
        {/* Promo Code */}
        <div className="checkout-box">
          <h3>Promo Code</h3>
          <div className="promo-row">
            <input
              type="text"
              placeholder="Enter promo code (e.g., SAVE10)"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
        </div>

        {/* Address */}
        <div className="checkout-box">
          <h3>Delivery Address</h3>
          <form className="address-form">
            <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
            <input type="text" placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
            <input type="text" placeholder="House / Street / Area" value={address.addressLine} onChange={(e) => setAddress({ ...address, addressLine: e.target.value })} />
            <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
          </form>
        </div>

        {/* Summary */}
        <div className="checkout-box summary-box">
          <p>Subtotal: <span>${subtotal.toFixed(2)}</span></p>
          <p>Discount: <span>-${discountAmount.toFixed(2)}</span></p>
          <h3>Total: <span>${total.toFixed(2)}</span></h3>

          <button 
            className="place-order-btn" 
            onClick={handleOrder}
            disabled={cart.length === 0 || loading}
            style={{ 
              opacity: cart.length === 0 || loading ? 0.5 : 1, 
              cursor: cart.length === 0 || loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
