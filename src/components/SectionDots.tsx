"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-cursor-text={s.label}
          className="group relative flex items-center justify-end py-1.5"
        >
          <span className="mr-3 origin-right scale-75 translate-x-2 opacity-0 group-hover:scale-100 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-out whitespace-nowrap text-[11px] font-mono font-semibold uppercase tracking-widest text-zinc-600 bg-white border border-zinc-200 shadow-lg shadow-zinc-900/5 rounded-full px-3.5 py-1.5">
            {s.label}
          </span>
          <motion.span
            animate={{
              scale: active === s.id ? 1.3 : 1,
              backgroundColor: active === s.id ? "#d97706" : "#d4d4d8",
            }}
            transition={{ duration: 0.2 }}
            className="block w-1.5 h-1.5 rounded-full shrink-0"
          />
        </a>
      ))}
    </div>
  );
}
