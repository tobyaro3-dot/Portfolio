import type { ReactNode } from "react";

type GradientBorderProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function GradientBorder({
  children,
  className = "",
  innerClassName = "",
}: GradientBorderProps) {
  return (
    <span
      className={`animated-gradient-border relative inline-flex rounded-full p-px animate-gradient-shift ${className}`}
    >
      <span className={`relative inline-flex rounded-full ${innerClassName}`}>
        {children}
      </span>
    </span>
  );
}
