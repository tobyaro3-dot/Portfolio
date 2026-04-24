import { useEffect, useState } from "react";

export function useRoleCycle(length: number, intervalMs = 2000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs, length]);

  return index;
}
