import { useEffect, useState } from 'react';

const useFetch = function (url = '../../data.json') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sleep = function (s) {
    return new Promise(res => setTimeout(res, s * 1000));
  };

  useEffect(() => {
    (async () => {
      try {
        setData(null)
        setLoading(true);
        setError(null);
        await sleep(2);
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
