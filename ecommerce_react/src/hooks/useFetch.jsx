import { useState, useEffect } from "react";

export default function useFetch(asyncFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    asyncFn()
      .then((d) => {
        if (mounted) setData(d);
      })
      .catch((err) => {
        if (mounted) {
          // Handle both Axios and generic errors
          let message = "Something went wrong";

          if (err.response) {
            // Server responded with non-2xx status
            message = `Error ${err.response.status}: ${err.response.statusText}`;
          } else if (err.request) {
            // No response received
            message = "Network error: No response from server";
          } else {
            // Other errors (e.g., bad config or runtime)
            message = err.message || message;
          }

          setError({ message });
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

