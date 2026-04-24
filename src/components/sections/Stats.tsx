import { motion } from "framer-motion";
import { stats } from "../../data/portfolio";
import { SECTION_IDS } from "../../lib/constants";
import { viewportReveal } from "../../lib/animation";

export function Stats() {
  return (
    <section id={SECTION_IDS.resume} className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke px-0 md:grid-cols-3">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-bg px-8 py-12 text-center md:px-10 md:py-16"
            variants={viewportReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="font-display text-6xl italic text-text-primary md:text-8xl">
              {stat.value}
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
