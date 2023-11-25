import { useEffect, useState } from "react";
import { fetchApiFromURL } from "../utils/api";

const FetchApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("...Loading");
    setData(null);
    setError(null);

    fetchApiFromURL(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);

  return { data, loading, error };
};

export default FetchApi;
