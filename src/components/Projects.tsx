"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Ummah",
    description:
      "A Flutter app for discovering nearby mosques and halal restaurants. Distance-based sorting, place detail pages, and built-in prayer time & Qibla direction using GPS or manual address search.",
    tags: ["Flutter", "Dart", "Google Maps API", "Material 3"],
    github: "https://github.com/Hwako/Ummah",
    live: null,
    award: null,
  },
  {
    title: "SignSpace",
    description:
      "Real-time ASL tutor for Apple Vision Pro built at USC's Good Vibes Only Buildathon 2025 (a16z × Apple × NVIDIA). Uses hand tracking and CoreML to recognize signs and give joint-level feedback live in a 3D spatial environment.",
    tags: ["visionOS", "Swift", "RealityKit", "CoreML", "SwiftUI"],
    github: "https://github.com/mustafa-nom/SignSpace",
    live: null,
    award: "1st Place",
  },
  {
    title: "Stealth Fintech",
    description:
      "Working on something in the fintech space. Early days. More soon.",
    tags: ["Fintech", "In Progress"],
    github: null,
    live: null,
    award: null,
    stealth: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-16 px-6 md:px-16 bg-white border-b border-zinc-200"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-3">
            / projects
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Things I&apos;ve built
          </h2>
          <p className="mt-1.5 text-zinc-400 text-sm max-w-md">
            Data, product, and software. Some for class, some for fun, one in the oven.
          </p>
        </motion.div>

        <div className="space-y-0">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group py-5 border-b border-zinc-100 first:border-t hover:bg-zinc-50 -mx-3 px-3 rounded-lg transition-colors duration-150 ${"stealth" in project && project.stealth ? "opacity-60" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-zinc-900">
                      {project.title}
                    </h3>
                    {project.award && (
                      <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        {project.award}
                      </span>
                    )}
                    {"stealth" in project && project.stealth && (
                      <span className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full">
                        WIP
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-2.5 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0 pt-0.5">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-medium"
                    >
                      GitHub <ArrowUpRight size={11} />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-900 transition-colors font-medium"
                    >
                      Live <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
