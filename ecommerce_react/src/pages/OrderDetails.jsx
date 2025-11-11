import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../styles/pages/orderDetails.css";
import { getOrderById, deleteOrder } from "../services/api";
import Loader from "../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderData = await getOrderById(id);
      setOrder(orderData);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    const statusMap = {
      "Ordered": 0,
      "Shipped": 1,
      "Out for Delivery": 2,
      "Delivered": 3
    };
    return statusMap[status] || 0;
  };

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        await deleteOrder(id);
        alert("❌ Order Cancelled");
        navigate("/orders");
      } catch (err) {
        console.error("Error cancelling order:", err);
        alert(`Failed to cancel order: ${err.message}`);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="order-details-container">Error: {error}</div>;
  if (!order) return <div className="order-details-container">Order Not Found</div>;

  const statusIndex = getStatusIndex(order.status);
  const steps = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>

      <div className="order-info-box">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Contact Number:</strong> {order.contactNumber}</p>
        <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status || "Ordered"}</p>
        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>

      {/* Progress Tracker */}
      <div className="progress-track">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(statusIndex / 3) * 100}%` }}></div>
        </div>
        <div className="progress-steps">
          {steps.map((step, index) => (
            <div className="step" key={index}>
              <div className={`dot ${index <= statusIndex ? "active" : ""}`}></div>
              <p className={index <= statusIndex ? "active-text" : ""}>{step}</p>
            </div>
          ))}
        </div>
      </div>

     <h3>Items</h3>
<div className="items-list">
  {order.items && order.items.length > 0 ? (
    order.items.map((item) => (
      <div className="item-card" key={item.id}>
        <img src={item.image} alt={item.title} />
        <div className="item-info">
          <p>{item.title}</p>
          <span>Qty: {item.quantity || item.qty}</span>
        </div>
        <p className="item-price">${((item.price || 0) * (item.quantity || item.qty || 0)).toFixed(2)}</p>
      </div>
    ))
  ) : (
    <p>No items found for this order.</p>
  )}
</div>

{/* Delivery Address Section */}
<div className="delivery-box">
  <h3>Delivery Address</h3>

  {order.address ? (
    <>
      <p><strong>Name:</strong> {order.address.name}</p>
      <p><strong>Phone:</strong> {order.address.phone}</p>
      <p><strong>Address:</strong> {order.address.addressLine}, {order.address.city}</p>
      <p><strong>Pincode:</strong> {order.address.pincode}</p>
    </>
  ) : (
    <p style={{ color: "gray" }}>No address information found for this order.</p>
  )}
</div>

      <div className="buttons-row">
        <button className="cancel-order-btn" onClick={handleCancel}>Cancel Order</button>
        <Link to="/orders" className="back-btn">← Back to Orders</Link>
      </div>
    </div>
  );
};

export default OrderDetails;
