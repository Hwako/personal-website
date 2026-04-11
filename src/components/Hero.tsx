"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-end md:items-center px-6 md:px-16 overflow-hidden"
      style={{ backgroundColor: "#fafaf9" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundPosition: "30% center" }}
      />
      {/* Overlay — heavier on the right so text pops, transparent on the left so the photo blends */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fafaf9]/30 to-[#fafaf9]/80" />
      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fafaf9] to-transparent" />

      {/* Layout: photo left, text right */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-end md:items-center gap-12 pb-24 md:pb-0 pt-24 md:pt-0">

        {/* Photo — blends into the background crowd naturally */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="shrink-0 w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
          style={{ alignSelf: "flex-end" }}
        >
          <img
            src="/photo.jpg"
            alt="Hamza Wako"
            className="w-full h-full object-cover object-top"
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

        {/* Text — right side */}
        <div className="flex-1 md:pb-8">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-[58px] md:text-[88px] font-bold text-zinc-900 leading-[0.95] tracking-tight mb-5 drop-shadow-[0_2px_32px_rgba(250,250,249,1)]"
          >
            Hamza Wako.
          </motion.h1>

          {/* School + location */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base"
          >
            <span className="text-zinc-900 font-semibold drop-shadow-[0_1px_12px_rgba(250,250,249,1)]">USC &apos;27</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-900 font-semibold drop-shadow-[0_1px_12px_rgba(250,250,249,1)]">Los Angeles</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 z-10 h-px bg-zinc-200 origin-left"
      />
    </section>
  );
}
