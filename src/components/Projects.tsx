"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Minara",
    description:
      "A Flutter app that helps Muslims stay close to their community — discover and RSVP to local mosque events, browse a mosque directory, follow daily reflections, and access prayer times & Qibla direction, all in one place.",
    tags: ["Flutter", "Dart", "Firebase", "Material 3"],
    github: "https://github.com/Hwako/Minara",
    live: null,
    award: null,
    preview: ["/minara-social-square.jpg", "/minara-social-story.jpg"],
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
    title: "AI Research Agent",
    description:
      "An autonomous research agent that filters daily topics for relevance, then scrapes and summarizes articles. Engineered a self-review loop where the agent drafts and critiques its own output before sending, improving quality without human review.",
    tags: ["Python", "LangGraph", "Claude API"],
    github: "https://github.com/Hwako/ai-research-agent",
    live: null,
    award: null,
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

const cardFade = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

const PREVIEW_CYCLE_MS = 2200;

function HoverPreview({
  images,
  x,
  y,
  visible,
}: {
  images: string[];
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  visible: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!visible || images.length < 2) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, PREVIEW_CYCLE_MS);
    return () => clearInterval(id);
  }, [visible, images.length]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ x, y, position: "fixed", top: 0, left: 0 }}
          className="pointer-events-none z-[200] w-52 rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/10 bg-zinc-900"
        >
          <div className="relative aspect-[4/5]">
            <AnimatePresence initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </AnimatePresence>
          </div>
          {images.length > 1 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((img, i) => (
                <span
                  key={img}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === index ? 14 : 5,
                    background: i === index ? "#fbbf24" : "rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 18 });
  const liftY = useSpring(rawY, { stiffness: 300, damping: 20 });

  const preview = "preview" in project ? project.preview : undefined;
  const hasPreview = !!preview && preview.length > 0;
  const [previewVisible, setPreviewVisible] = useState(false);
  const rawPreviewX = useMotionValue(0);
  const rawPreviewY = useMotionValue(0);
  const previewX = useSpring(rawPreviewX, { stiffness: 400, damping: 40 });
  const previewY = useSpring(rawPreviewY, { stiffness: 400, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 8);
    rawRotateX.set(-py * 8);

    if (hasPreview) {
      rawPreviewX.set(e.clientX + 22);
      rawPreviewY.set(e.clientY - 130);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rawY.set(-4);
    if (hasPreview) {
      rawPreviewX.set(e.clientX + 22);
      rawPreviewY.set(e.clientY - 130);
      setPreviewVisible(true);
    }
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawY.set(0);
    setPreviewVisible(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardFade}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, y: liftY, transformStyle: "preserve-3d" }}
      className={`group flex flex-col border border-zinc-200 rounded-xl p-5 bg-white hover:shadow-md hover:shadow-amber-900/5 hover:border-amber-300 transition-[box-shadow,border-color] duration-200 ${"stealth" in project && project.stealth ? "opacity-60" : ""}`}
    >
      {hasPreview && (
        <HoverPreview images={preview} x={previewX} y={previewY} visible={previewVisible} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <h3 className="text-sm font-semibold text-zinc-900">
            {project.title}
          </h3>
          {project.award && (
            <motion.span
              whileHover={{ rotate: [0, -8, 8, -6, 6, 0] }}
              transition={{ duration: 0.4 }}
              className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full cursor-default"
            >
              {project.award}
            </motion.span>
          )}
          {"stealth" in project && project.stealth && (
            <span className="text-[10px] font-mono text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded-full">
              WIP
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed mb-3">
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
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-100">
        {project.github && project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="View"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-700 transition-colors font-medium"
          >
            GitHub <ArrowUpRight size={11} />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="View"
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-700 transition-colors font-medium"
          >
            Live <ArrowUpRight size={11} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

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
          variants={cardFade}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-3">
            <span className="text-amber-600">/</span> projects
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Things I&apos;ve built
          </h2>
          <p className="mt-1.5 text-zinc-400 text-sm max-w-md">
            Data, product, and software. Some for class, some for fun, one in the oven.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4" style={{ perspective: 1000 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
