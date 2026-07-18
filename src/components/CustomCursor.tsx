"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function useHoverCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCapable(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCapable(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return capable;
}

export default function CustomCursor() {
  const hoverCapable = useHoverCapable();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<{ active: boolean; label: string | null }>({
    active: false,
    label: null,
  });
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !hoverCapable) return;

    document.body.classList.add("cursor-none-custom");

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const match = target.closest<HTMLElement>("a, button, [data-cursor]");
      if (match) {
        setHovered({ active: true, label: match.dataset.cursorText ?? null });
      }
    };

    const handleOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("a, button, [data-cursor]")) {
        setHovered({ active: false, label: null });
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      document.body.classList.remove("cursor-none-custom");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [mounted, hoverCapable, mouseX, mouseY]);

  if (!mounted || !hoverCapable) return null;

  const ringScale = hovered.active ? (hovered.label ? 1.9 : 1.6) : pressed ? 0.7 : 1;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-zinc-900"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          marginLeft: -3,
          marginTop: -3,
          opacity: hovered.active ? 0 : 1,
        }}
        animate={{ scale: pressed ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border flex items-center justify-center"
        style={{
          width: 32,
          height: 32,
          x: ringX,
          y: ringY,
          marginLeft: -16,
          marginTop: -16,
          borderColor: hovered.active ? "#71717a" : "#a1a1aa",
        }}
        animate={{ scale: ringScale }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hovered.label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] font-mono font-medium text-zinc-700 whitespace-nowrap"
          >
            {hovered.label}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
