import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(baseUrl + url)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading, error];
}
