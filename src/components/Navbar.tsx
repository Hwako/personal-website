"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fafaf9]/90 backdrop-blur-md border-b border-zinc-200/70"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-zinc-900 font-bold text-base tracking-tight hover:text-zinc-500 transition-colors font-mono"
        >
          HW
        </a>
        <div className="flex items-center gap-2 text-sm text-zinc-600">
          {["About", "Experience", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-1.5 rounded-full bg-zinc-100/60 hover:bg-zinc-200/80 hover:text-zinc-900 transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
