"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GitHubIcon } from "./BrandIcons";

type Project = { name: string; category: string; description: string; href?: string | null; linkLabel?: string; logo: string | null; artwork: "paevos" | "minara" | "signspace" | "research" | "experience" };
const signspaceImages = [
  { src: "/signspace-1.jpg", caption: "The SignSpace buildathon team" },
  { src: "/signspace-2.jpg", caption: "Testing with Apple Vision Pro" },
  { src: "/signspace-3.jpg", caption: "Presenting SignSpace at USC" },
];

export default function ProjectCard({ project }: { project: Project }) {
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dismissing = useRef(false);
  const swipeStart = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [focused, setFocused] = useState(false);
  const [slide, setSlide] = useState(0);
  const [above, setAbove] = useState(false);
  const open = hovered || pinned || focused;
  const reduceMotion = useReducedMotion();
  const moveSlide = (direction: number) => setSlide((current) => (current + direction + signspaceImages.length) % signspaceImages.length);
  const placePreview = () => { const box = ref.current?.getBoundingClientRect(); if (box) setAbove(window.innerHeight - box.top < 300 && box.bottom > 300); };
  const toggle = () => { placePreview(); setPinned(!pinned); if (pinned) { setFocused(false); setHovered(false); } };

  useEffect(() => {
    if (!pinned) return;
    const outside = (event: PointerEvent) => { if (!ref.current?.contains(event.target as Node)) { setPinned(false); setFocused(false); } };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [pinned]);

  return <article ref={ref} className={`project-card project-${project.artwork}`} data-open={open} data-side={above ? "above" : "below"}
    onClick={(event) => { if (!(event.target as Element).closest("a,button") && window.getSelection()?.type !== "Range") toggle(); }}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") { placePreview(); setHovered(true); } }}
    onPointerLeave={() => setHovered(false)}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setPinned(false); } }}
    onKeyDown={(event) => {
      if (event.key !== "Escape" || !open) return;
      event.preventDefault(); event.stopPropagation();
      dismissing.current = true; triggerRef.current?.focus({ preventScroll: true }); dismissing.current = false;
      setPinned(false); setHovered(false); setFocused(false);
    }}>
    <motion.button ref={triggerRef} type="button" className="project-trigger" aria-expanded={open} aria-controls={id}
      whileTap={{ scale: .96 }} transition={{ duration: .15, ease: "easeOut" }}
      onFocus={(event) => { if (!dismissing.current) { placePreview(); setFocused(event.currentTarget.matches(":focus-visible")); } }} onClick={toggle}>
      <span className="project-identity"><span className="project-logo" aria-hidden="true">{project.logo ? <Image src={project.logo} alt="" width={28} height={28} /> : <GitHubIcon />}</span><span><span className="project-name">{project.name}</span><span className="project-category">{["In production", "Live on the App Store"].includes(project.category) && <i />}{project.category}</span></span></span>
    </motion.button>
    <div id={id} className="project-preview-anchor">
      <AnimatePresence initial={false}>
        {open && <motion.div key="preview" className="floating-preview" role="region" aria-label={`${project.name} preview`}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: .98, y: above ? -4 : 4 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { duration: .15, ease: "easeOut" } }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : .98, y: reduceMotion ? 0 : 2, transition: { duration: .12, ease: "easeOut" } }}>
          {project.artwork === "experience" ? null : project.artwork === "signspace" ? <div className="signspace-gallery" role="group" aria-roledescription="carousel" aria-label="SignSpace images"
            onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); moveSlide(event.key === "ArrowRight" ? 1 : -1); } }}
            onTouchStart={(event) => { swipeStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
            onTouchEnd={(event) => { const dx = event.changedTouches[0].clientX - swipeStart.current.x; const dy = event.changedTouches[0].clientY - swipeStart.current.y; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) moveSlide(dx < 0 ? 1 : -1); }}>
            <div className="gallery-image"><AnimatePresence initial={false} mode="wait"><motion.div key={slide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .1 }}><Image src={signspaceImages[slide].src} alt={signspaceImages[slide].caption} width={600} height={420} /></motion.div></AnimatePresence></div>
            <div className="gallery-toolbar"><button type="button" onClick={() => moveSlide(-1)} aria-label="Previous SignSpace image"><ChevronLeft size={16} /></button><span aria-live="polite">{slide + 1} / {signspaceImages.length}</span><div className="gallery-dots">{signspaceImages.map((item, index) => <button type="button" key={item.src} onClick={() => setSlide(index)} aria-label={`Show SignSpace image ${index + 1}`} aria-pressed={index === slide}><i /></button>)}</div><button type="button" onClick={() => moveSlide(1)} aria-label="Next SignSpace image"><ChevronRight size={16} /></button></div>
            <p className="gallery-caption">{signspaceImages[slide].caption}</p>
          </div> : <div className={`project-page-image image-${project.artwork}`}><Image src={project.artwork === "paevos" ? "/previews/paevos-page.jpg" : project.artwork === "minara" ? "/minara-social-square.jpg" : "/previews/research-page.jpg"} alt={`${project.name} ${project.artwork === "research" ? "GitHub page" : project.artwork === "paevos" ? "website" : "app"} preview`} width={1200} height={800} /></div>}
          <div className="project-preview-copy"><p>{project.description}</p>{project.href && <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel}<ArrowUpRight size={13} strokeWidth={1.5} absoluteStrokeWidth /></a>}</div>
        </motion.div>}
      </AnimatePresence>
    </div>
  </article>;
}
