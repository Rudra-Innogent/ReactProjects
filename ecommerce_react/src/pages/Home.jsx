import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";
import { fetchAllProducts, fetchAllCategories } from "../services/api";
import "../styles/pages/home.css";

const Home = () => {
  const { data: products, loading: pLoading, error: pError } = useFetch(fetchAllProducts, []);
  const { data: categories, loading: cLoading } = useFetch(fetchAllCategories, []);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const filtered = useMemo(() => {
    if (!products) return [];
    let arr = products;
    if (activeCategory !== "all") arr = arr.filter((p) => p.category === activeCategory);
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      arr = arr.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    // Filter by price range
    if (priceRange !== "all") {
      switch(priceRange) {
        case "0-1000":
          arr = arr.filter((p) => p.price >= 0 && p.price <= 1000);
          break;
        case "1000-2000":
          arr = arr.filter((p) => p.price > 1000 && p.price <= 2000);
          break;
        case "2000-5000":
          arr = arr.filter((p) => p.price > 2000 && p.price <= 5000);
          break;
        case "5000-10000":
          arr = arr.filter((p) => p.price > 5000 && p.price <= 10000);
          break;
        case "10000+":
          arr = arr.filter((p) => p.price > 10000);
          break;
        default:
          break;
      }
    }
    return arr;
  }, [products, activeCategory, search, priceRange]);

  if (pLoading || cLoading) return <Loader />; 
  if (pError) return <p className="error">Error loading products: {pError.message}</p>;

  // Build category-wise groups from filtered results
  const grouped = filtered.reduce((acc, prod) => {
    (acc[prod.category] = acc[prod.category] || []).push(prod);
    return acc;
  }, {});

  return (
    <div className="home-page">
      
      <section className="controls">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-dropdowns">
          <select 
            className="category-dropdown"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories && categories.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
          <select 
            className="price-dropdown"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="0-1000">$0 - $1000</option>
            <option value="1000-2000">$1000 - $2000</option>
            <option value="2000-5000">$2000 - $5000</option>
            <option value="5000-10000">$5000 - $10000</option>
            <option value="10000+">$10000+</option>
          </select>
        </div>
      </section>

      <section className="product-sections">
        {Object.keys(grouped).length === 0 ? (
          <p>No products found.</p>
        ) : (
          Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="category-block">
              <h3 className="category-title">{category}</h3>
              <div className="product-grid">
                {items.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Home;

