import { useState, useEffect } from "react";

import { getProducts } from "./services/productServices";

import "./style.min.css";

import Header from "./Header";
import Footer from "./Footer.jsx";

export default function App() {
  const [state, setState] = useState({
    price: "",
    products: [],
    error: null,
  });

  const { price, products, error } = state;

  useEffect(() => {
    getProducts("footwear")
      .then((response) => setState({ ...state, products: response }))
      .catch((e) => setState({ ...state, error: e }));
  }, []);

  const handleChange = (name) => (e) =>
    setState({ ...state, [name]: e.target.value });

  if (error) throw error;

  function renderFilter() {
    return (
      <>
        <label htmlFor="price">Filter by Price</label>
        <select id="price" value={price} onChange={handleChange("price")}>
          <option value="">any price</option>
          <option value="10">below £10</option>
          <option value="20">below 20</option>
          <option value="40">below 40</option>
          <option value="100">bellow 100</option>}
        </select>
        {price && (
          <h2>
            Found {filteredProducts.length} item
            {filteredProducts.length > 1 && "s"}
          </h2>
        )}
      </>
    );
  }

  const filteredProducts = price
    ? products.filter((p) => p.price <= parseInt(price))
    : products;

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
