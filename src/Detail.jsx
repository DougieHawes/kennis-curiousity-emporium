import { useParams, useHistory } from "react-router-dom";

import useFetch from "./services/useFetch";

import PageNotFound from "./PageNotFound";

export default function Detail() {
  const history = useHistory();
  const { id } = useParams();

  const product = useFetch(`products/${id}`)[0];
  const loading = useFetch(`products/${id}`)[1];
  const error = useFetch(`products/${id}`)[2];

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>{product.description}</p>
      <button onClick={() => history.push("/cart")}>add to cart</button>
    </div>
  );
}
