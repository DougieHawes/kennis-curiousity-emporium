import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import useFetch from "./services/useFetch";

import PageNotFound from "./PageNotFound";

export default function Products() {
  const [state, setState] = useState({ price: "" });
  const { category } = useParams();

  const { price } = state;

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
        {filteredProducts.length === 0 && <PageNotFound />}
      </>
    );
  }

  if (error) throw error;

  function renderProduct(p) {
    return (
      <div key={p.id}>
        <Link to={`/${category}/${p.id}`}>
          <h3>{p.name}</h3>
          <p>£{p.price}</p>
        </Link>
      </div>
    );
  }

  return (
    <>
      <section>{renderFilter()}</section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
