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
          className="group relative flex items-center justify-end py-1"
        >
          <span className="mr-3 text-[10px] font-mono uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {s.label}
          </span>
          <motion.span
            animate={{
              scale: active === s.id ? 1.3 : 1,
              backgroundColor: active === s.id ? "#d97706" : "#d4d4d8",
            }}
            transition={{ duration: 0.2 }}
            className="block w-1.5 h-1.5 rounded-full"
          />
        </a>
      ))}
    </div>
  );
}
