import {useEffect, useState} from "react";
import sleep from "./sleep";

const TIMEOUT_SEC = 5;

const useFetch = function (url = "../../data.json") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${sec} second`));
      }, sec * 1000);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setData(null);
        setLoading(true);
        setError(null);
        await sleep(2);
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

  return {data, loading, error};
};

export default useFetch;
