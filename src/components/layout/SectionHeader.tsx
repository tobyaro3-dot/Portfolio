import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { viewportReveal } from "../../lib/animation";
import { GradientBorder } from "./GradientBorder";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = "#",
  align = "left",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <motion.div
      className={`mb-10 flex flex-col gap-8 md:mb-14 ${
        isCentered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between"
      }`}
      variants={viewportReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-2xl">
        <div
          className={`mb-5 flex items-center gap-4 ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-5xl font-light leading-none tracking-tight text-text-primary md:text-7xl">
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-5 max-w-md text-sm leading-7 text-muted md:text-base ${
              isCentered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
      {actionLabel ? (
        <a href={actionHref} className="hidden md:inline-flex">
          <GradientBorder innerClassName="items-center gap-2 bg-bg px-5 py-3 text-sm text-text-primary transition-colors hover:bg-surface">
            {actionLabel}
            <span aria-hidden="true">↗</span>
          </GradientBorder>
        </a>
      ) : null}
    </motion.div>
  );
}
