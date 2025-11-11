// src/services/api.jsx
import axios from "axios";

// Spring Boot Backend Base URL
const BASE_URL = "http://localhost:8080";

// Create a reusable axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//  PRODUCT API (from Spring Boot) 
export async function fetchAllProducts() {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch all products");
  }
}

export async function fetchProductById(id) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch product");
  }
}

export async function fetchAllCategories() {
  try {
    const res = await api.get("/products/categories");
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch categories");
  }
}

//  ORDER API  
export async function createOrder(orderData) {
  try {
    const res = await api.post("/orders/createOrder", orderData);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to create order");
  }
}

export async function getAllOrders() {
  try {
    const res = await api.get("/orders/getAllOrders");
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch orders");
  }
}

export async function getOrderById(id) {
  try {
    const res = await api.get(`/orders/${id}`);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch order");
  }
}

export async function deleteOrder(id) {
  try {
    await api.delete(`/orders/${id}`);
    return true;
  } catch (error) {
    handleError(error, "Failed to delete order");
  }
}

// Common error handler
function handleError(error, message) {
  if (error.response) {
    // Server responded with a status other than 2xx
    throw new Error(`${message}: ${error.response.statusText}`);
  } else if (error.request) {
    // Request was made but no response received
    throw new Error(`${message}: No response from server`);
  } else {
    // Something else happened
    throw new Error(`${message}: ${error.message}`);
  }
}
