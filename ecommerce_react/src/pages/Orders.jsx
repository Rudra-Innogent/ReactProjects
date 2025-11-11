import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/orders.css";
import { getAllOrders } from "../services/api";
import Loader from "../components/Loader";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders();
      setOrders(ordersData || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="error">Error loading orders: {error}</p>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  order.status === "Delivered"
                    ? "status-delivered"
                    : "status-pending"
                }
              >
                {order.status || "Ordered"}
              </span>
            </p>

            <Link to={`/orders/${order.id}`} className="view-details-btn">
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
