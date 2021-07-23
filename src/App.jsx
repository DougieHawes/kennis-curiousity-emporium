import { useState } from "react";

import useFetch from "./services/useFetch";

import "./style.min.css";

import Header from "./Header";
import Footer from "./Footer.jsx";

export default function App() {
  const [state, setState] = useState({ category: "", price: "" });

  const { category, price } = state;

  const [products, loading, error] = useFetch(
    `products?${category && `category=${category}`}`
  );

  const handleChange = (name) => (e) =>
    setState({ ...state, [name]: e.target.value });

  function getFilteredProducts() {
    if (!products) return [];
    return price
      ? products.filter((p) => p.price <= parseInt(price))
      : products;
  }

  const filteredProducts = getFilteredProducts();

  function renderFilter() {
    return (
      <>
        <label htmlFor="category">Filter by Price</label>
        <select
          id="category"
          value={category}
          onChange={handleChange("category")}
        >
          <option value="">any</option>
          <option value="utensils">utensils</option>
          <option value="jewellery">jewellery</option>
          <option value="footwear">footwear</option>
        </select>
        <label htmlFor="price">Filter by Price</label>
        <select id="price" value={price} onChange={handleChange("price")}>
          <option value="">any price</option>
          <option value="10">below £10</option>
          <option value="20">below 20</option>
          <option value="40">below 40</option>
          <option value="100">bellow 100</option>
        </select>
        {loading && <div>loading</div>}
        {price && (
          <h2>
            Found {filteredProducts.length} item
            {filteredProducts.length !== 1 && "s"}
          </h2>
        )}
      </>
    );
  }

  if (error) throw error;

  function renderProduct(p) {
    return (
      <div key={p.id}>
        <a href="/">
          <h3>{p.name}</h3>
          <p>£{p.price}</p>
        </a>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <section>{renderFilter()}</section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
      <Footer />
    </div>
  );
}
