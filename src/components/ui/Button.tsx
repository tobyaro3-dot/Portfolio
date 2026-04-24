import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function Button({
  children,
  className = "",
  variant = "solid",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "solid"
      ? "bg-text-primary text-bg hover:bg-bg hover:text-text-primary"
      : "border-2 border-stroke bg-bg text-text-primary hover:border-transparent";

  return (
    <a
      className={`group relative inline-flex rounded-full p-[2px] transition-transform duration-300 hover:scale-105 ${className}`}
      {...props}
    >
      <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={`relative inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300 ${variantClass}`}
      >
        {children}
      </span>
    </a>
  );
}
