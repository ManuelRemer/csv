import { useState, useEffect } from "react";

export const useFetch = (url, method) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    console.log("hi");
    setOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions) => {
      setIsPending(true);

      try {
        const res = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });
        const dataFromJson = await res.json();

        if (!res.ok) {
          throw new Error(dataFromJson.msg);
        }

        setIsPending(false);
        setData(dataFromJson);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false);
          setError(err.message);
          console.log(err.message);
        }
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (options && options.method === "POST") {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, options, method]);

  return { data, isPending, error, postData };
};
