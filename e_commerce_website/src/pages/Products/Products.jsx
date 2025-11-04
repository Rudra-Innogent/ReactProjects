import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Search by name, category, or price
  useEffect(() => {
    let temp = products.filter((item) => {
      const nameMatch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch = item.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const priceMatch = item.price
        .toString()
        .includes(searchTerm.toLowerCase());
      return nameMatch || categoryMatch || priceMatch;
    });

    setFilteredProducts(temp);
  }, [searchTerm, products]);

  // Filter by category and price range
  const handleFilter = () => {
    let temp = products;

    if (filterCategory) {
      temp = temp.filter((item) =>
        item.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    if (filterPrice) {
      if (filterPrice === "10000+") {
        temp = temp.filter((item) => item.price > 10000);
      } else {
        const [min, max] = filterPrice.split("-").map(Number);
        temp = temp.filter((item) => item.price >= min && item.price <= max);
      }
    }

    setFilteredProducts(temp);
  };

  const handleCardClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="products-page">
      <h2 className="page-title">Our Products</h2>

      {/* Search & Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search by name, category, or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
        </select>

        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-1000">₹0 - ₹1000</option>
          <option value="1000-5000">₹1000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
          <option value="10000+">Above ₹10000</option>
        </select>

        <button onClick={handleFilter}>Filter</button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => handleCardClick(item)}
            >
              <img src={item.image} alt={item.title} />
              <div className="card-info">
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>

                <div className="action-buttons">
                  <button className="add-to-cart-btn">Add to Cart</button>
                  <button className="buy-now-btn">Buy </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
