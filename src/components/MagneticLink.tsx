"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

type MagneticLinkProps = HTMLMotionProps<"a"> & {
  strength?: number;
};

export default function MagneticLink({
  strength = 0.3,
  style,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 15 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      rawX.set(Math.max(-8, Math.min(8, offsetX * strength)));
      rawY.set(Math.max(-8, Math.min(8, offsetY * strength)));
    }
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    rawX.set(0);
    rawY.set(0);
    onMouseLeave?.(e);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, x, y }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
