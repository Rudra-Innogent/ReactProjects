import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import "../components/ProductDetails";


const Products = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setProducts(data);
      setFiltered(data);

      // Extract categories dynamically
      const uniqueCats = [...new Set(data.map((p) => p.category))];
      setCategories(uniqueCats);
    };

    fetchData();
  }, []);

  // Calculate dynamic price ranges based on max price
  const priceRanges = (() => {
    if (products.length === 0) return [];
    const maxPrice = Math.ceil(Math.max(...products.map((p) => p.price))) + 1000;
    const step = 1000;
    const ranges = [];
    for (let i = 0; i < maxPrice; i += step) {
      ranges.push({ min: i, max: i + step });
    }
    return ranges;
  })();

  // Handle search/filter changes
  useEffect(() => {
    let result = [...products];

    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice !== "") {
      const [min, max] = selectedPrice.split("-").map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    setFiltered(result);
  }, [searchTerm, selectedCategory, selectedPrice, products]);

  return (
    <div className="products-page">
      {/* Sticky Filter + Search Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <select
          className="filter-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="filter-dropdown"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="">All Prices</option>
          {priceRanges.map((range, i) => (
            <option key={i} value={`${range.min}-${range.max}`}>
              ₹{range.min} - ₹{range.max}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid Section */}
      <div className="product-list">
        {filtered.map((product) => (
          <ProductCard
  key={product.id}
  product={product}
  onClick={() => navigate(`/product/${product.id}`)}
/>

        ))}
      </div>
    </div>
  );
};

export default Products;
