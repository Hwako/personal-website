"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      <nav className="w-full px-4 md:px-10 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ rotate: [0, -8, 8, -6, 6, 0] }}
          transition={{ duration: 0.4 }}
          className="inline-block opacity-90 hover:opacity-70 transition-opacity shrink-0"
        >
          <Image src="/logo.svg" alt="Hamza Wako" width={36} height={36} className="rounded-full" />
        </motion.a>
        <div className="flex items-center gap-0.5 sm:gap-2 text-[11px] sm:text-sm text-zinc-600">
          {["About", "Experience", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-2 sm:px-4 py-1.5 rounded-full bg-zinc-100/60 hover:bg-amber-50 hover:text-amber-800 transition-all duration-200 whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
