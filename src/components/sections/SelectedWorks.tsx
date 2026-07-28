import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../data/portfolio";
import { projects, researchProjects } from "../../data/portfolio";
import { SECTION_IDS } from "../../lib/constants";
import { HlsVideo } from "../layout/HlsVideo";
import { SectionHeader } from "../layout/SectionHeader";
import { CaseStudyModal } from "../ui/CaseStudyModal";
import { ProjectCard } from "../ui/ProjectCard";

const selectedWorkNebulaSource =
  "https://stream.mux.com/r6pXRAJb3005XEEbl1hYU1x01RFJDSn7KQApwNGgAHHbU.m3u8";

export function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const handleOpenProject = (project: Project) => {
    if (project.slug === "tisato") {
      navigate("/work/tisato");
      return;
    }
    if (project.slug === "tap") {
      navigate("/work/tap");
      return;
    }
    if (project.slug === "solmate") {
      navigate("/work/solmate");
      return;
    }
    if (project.slug === "national-lighthouse-museum") {
      navigate("/work/national-lighthouse-museum");
      return;
    }

    setSelectedProject(project);
  };

  return (
    <section
      id={SECTION_IDS.work}
      className="relative overflow-hidden bg-[#020304] py-12 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <HlsVideo
          src={selectedWorkNebulaSource}
          className="selected-work-nebula-video opacity-70 saturate-150 contrast-125"
          overlayClassName="bg-black/45"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/70" />
        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.78)_100%)]" />
        <span className="selected-work-nebula selected-work-nebula-flow" />
        <span className="selected-work-nebula selected-work-nebula-primary" />
        <span className="selected-work-nebula selected-work-nebula-secondary" />
        <span className="selected-work-particles" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          align="center"
          title={
            <>
              Designing{" "}
              <span className="font-display italic text-text-primary">
                systems
              </span>{" "}
              that make{" "}
              <span className="font-display italic text-text-primary">
                complex
              </span>{" "}
              things feel simple.
            </>
          }
          actionLabel="View all work"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={handleOpenProject}
            />
          ))}
        </div>
        <div className="mt-24 md:mt-28">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-text-primary/40">
              UX Research &amp; HCI
            </p>
            <p className="mt-4 text-xl leading-8 text-text-primary/68 md:text-2xl">
              Understanding how people behave before deciding what to build.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
            {researchProjects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedProject ? (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
