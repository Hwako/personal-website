"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HeroConstellation = dynamic(() => import("./HeroConstellation"), {
  ssr: false,
});

const skills = [
  "Python", "SQL", "C++", "Machine Learning", "Data Visualization",
  "Product Strategy", "Agile", "Cross-Team Collaboration", "Multilingual",
  "Agentic AI", "MS Suite",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 18 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * 12);
    rawRotateX.set(-py * 12);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="float-none sm:float-right mx-auto sm:mx-0 sm:ml-8 mb-5 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl ring-1 ring-black/5"
    >
      <img
        src="/hero-sunset.jpg"
        alt="Hamza Wako"
        className="w-full h-full object-cover"
        style={{ objectPosition: "42% 68%" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          const parent = e.currentTarget.parentElement;
          if (parent) {
            parent.innerHTML =
              '<span class="flex items-center justify-center h-full text-white font-bold text-2xl tracking-tight font-mono bg-zinc-900">HW</span>';
          }
        }}
      />
    </motion.div>
  );
}

export default function Intro() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden bg-[#fafaf9] border-b border-zinc-200"
    >
      <HeroConstellation />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafaf9]/50 to-[#fafaf9]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-6"
        >
          <span className="text-amber-600">/</span> about
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <TiltPhoto />

          <span className="block text-[42px] md:text-[64px] font-bold text-zinc-900 tracking-tight leading-[0.95] mb-4 hover:text-amber-700 transition-colors w-fit">
            Hamza Wako.
          </span>

          <p className="text-base md:text-lg leading-relaxed text-zinc-600 max-w-2xl">
            I&apos;m a curious person by default. I want to know how things work, not just that they work. Building things is the fastest way to actually understand something, so that&apos;s usually where I end up, taking things apart and putting them back together myself.
          </p>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-500 max-w-2xl">
            I&apos;m studying Data Science at USC because it lets me see the whole picture instead of one slice of it. Data tells the story and leads the problem solving, and that goes hand in hand with product for me.
          </p>

          <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-500 max-w-2xl">
            Right now that means building something of my own in the fintech space, but it doesn&apos;t stop me from building other apps and side projects whenever something catches my attention. Outside of that I&apos;m usually outdoors, playing sports, hunting down new food spots, or out shooting photography, mostly street and portrait.{" "}
            <a
              href="https://www.instagram.com/wako.vision"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-800 font-medium underline underline-offset-2 decoration-amber-300 hover:decoration-amber-600 transition-all"
            >
              @wako.vision
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm clear-both">
            <span className="text-zinc-800 font-semibold">USC &apos;27</span>
            <span className="text-amber-600">·</span>
            <span className="text-zinc-800 font-semibold">Los Angeles</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap gap-1.5 clear-both"
        >
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
