import { useEffect, useState } from 'react';

const FetchThis = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        const postsTotal = res.headers.get('x-wp-total');

        setData(json);
        setLoading(false);
        setCount(postsTotal);
      } catch (error) {
        setError(error);
        setLoading(false);
        setCount(0);
      }
    };

    fetchData();
  }, [url]);

  return { count, data, error, loading };
};

export default FetchThis;
