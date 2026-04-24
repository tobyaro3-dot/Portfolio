import { useEffect, useState } from "react";

export function useScrollShadow(offset = 100) {
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const update = () => setHasShadow(window.scrollY > offset);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return hasShadow;
}
