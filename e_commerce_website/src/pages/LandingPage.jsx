// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = filteredProducts.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) groups[category] = [];
    groups[category].push(product);
    return groups;
  }, {});

  const sortedCategories = Object.keys(groupedByCategory).sort();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="landing-container">
      {/* Search Bar */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Category-wise Listing */}
      {loading ? (
        <div className="loading-text">Loading products...</div>
      ) : (
        sortedCategories.map((category) => (
          <div key={category} className="category-section">
            <h2 className="category-title">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="products-grid">
              {groupedByCategory[category].map((product) => {
                // Truncate title in JSX
                const MAX_LENGTH = 35; // adjust max characters
                const displayTitle =
                  product.title.length > MAX_LENGTH
                    ? product.title.slice(0, MAX_LENGTH) + "..."
                    : product.title;

                return (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, title: displayTitle }}
                    onClick={handleProductClick}
                  />
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default LandingPage;
