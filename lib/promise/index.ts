export function delay<T = any>(ms: number) {
  return (data: T) => {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(data), ms);
    });
  };
}

export function timeout(ms: number, signal?: AbortSignal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener("abort", (e) => {
      clearTimeout(timer);
      reject(e);
    });
  });
}
