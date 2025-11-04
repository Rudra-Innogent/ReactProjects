import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = data.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.price.toString().includes(term)
    );
  });

  const handleAddToCart = (product) => {
    alert(`🛒 '${product.title}' added to cart!`);
  };

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="landing-page">
      <h1 className="page-title">All Products</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, category, or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <h2>Loading...</h2>}

      <div className="product-grid">
        {filteredData.slice(0, 4).map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="card-link">
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹ {product.price}</p>
            </Link>

            <div className="card-buttons">
              <button
                className="btn-add"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <button
                className="btn-buy"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
