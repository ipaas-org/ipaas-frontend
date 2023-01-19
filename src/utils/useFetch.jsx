import { useEffect, useState } from 'react';

const TIMEOUT_SEC = 5;

const useFetch = function (url = '../../data.json') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sleep = function (s) {
    return new Promise(res => setTimeout(res, s * 1000));
  };

  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, sec * 1000);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setData(null);
        setLoading(true);
        setError(null);
        // await sleep(2);
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
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
