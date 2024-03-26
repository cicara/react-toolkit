import { useEffect, useState } from "react";

export function useServiceFunction<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  initValue: T
): { error: any; err: any; data: T; loading: boolean };

export function useServiceFunction<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  initValue?: T
): { error: any; err: any; data: T | undefined; loading: boolean };

export function useServiceFunction<T>(fn: (signal: AbortSignal) => Promise<T>, initValue?: T) {
  const [data, setData] = useState<T | undefined>(initValue);
  const [error, setError] = useState();
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    // settimeout 是为了解决 abort 的顺序问题
    setTimeout(() => {
      setLoading(true);
      fn(ac.signal)
        .then((data) => {
          setData(data);
          setError(void 0);
        })
        .catch((err) => {
          if (err instanceof DOMException && err.name === "AbortError") {
            // ignore
          } else {
            setError(err);
          }
        })
        .finally(() => setLoading(false));
    });
    return () => {
      ac.abort();
    };
  }, [fn]);

  return { loading, error, err: error, data };
}
