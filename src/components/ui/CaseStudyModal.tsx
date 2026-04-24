import { motion } from "framer-motion";
import type { Project } from "../../data/portfolio";

type CaseStudyModalProps = {
  project: Project;
  onClose: () => void;
};

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-xl md:px-8 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        className="fixed right-5 top-5 z-[101] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-bg/80 text-xl text-text-primary backdrop-blur-md transition-colors hover:bg-surface"
        onClick={onClose}
        aria-label="Close case study"
      >
        x
      </button>
      <motion.article
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-bg shadow-2xl shadow-black/40"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="relative min-h-[360px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">
              {project.role}
            </p>
            <h2 className="font-display text-6xl italic leading-none text-text-primary md:text-8xl">
              {project.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text-primary/85">
              {project.subtitle}
            </p>
          </div>
        </div>
        <div className="grid gap-px bg-stroke md:grid-cols-3">
          {[
            ["Scope", project.scope],
            ["Context", project.context],
            ["Location", project.location ?? "Concept Platform"],
          ].map(([label, value]) => (
            <div key={label} className="bg-bg p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                {label}
              </p>
              <p className="mt-3 text-sm leading-6 text-text-primary/85">
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="p-6 md:p-10">
          <p className="max-w-3xl text-lg leading-8 text-muted">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stroke bg-surface/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-6">
            {project.details.map((section) => (
              <section
                key={section.heading}
                className="rounded-3xl border border-stroke bg-surface/30 p-6 md:p-8"
              >
                <h3 className="font-display text-3xl italic text-text-primary">
                  {section.heading}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted md:text-base">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
