import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import { gsap } from "../lib/animation";

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
  deps: DependencyList = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) {
      return;
    }

    const context = gsap.context(setup, scope);
    return () => context.revert();
    // The caller owns the setup closure and dependency list for scoped GSAP work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
