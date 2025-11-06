// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

// ✅ Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data; // returning only data array
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ✅ Fetch products by category (optional helper)
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
};

// ✅ Fetch all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
