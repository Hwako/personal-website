"use client";

import { motion } from "framer-motion";

const skills = [
  "Python", "SQL", "C++", "Machine Learning", "Data Visualization",
  "Product Strategy", "Agile", "Cross-Team Collaboration", "Multilingual",
  "Agentic AI", "MS Suite",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-12 px-6 md:px-16 bg-white border-b border-zinc-200"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-3">
            / about
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-start">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="space-y-2.5 text-zinc-500 leading-relaxed text-sm"
          >
            <p>
              I&apos;m a student at USC studying Economics and Data Science. I got into product because I love the full picture of how something gets built and why it matters. I got into data because it tells the story. The overlap between the two is what keeps me genuinely excited.
            </p>
            <p>
              Right now I&apos;m working on something of my own in the fintech space, which is keeping me busy in the best way.
            </p>
            <p>
              Outside of that I shoot photography, mostly street and portrait.{" "}
              <a
                href="https://www.instagram.com/wako.vision"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-800 transition-all"
              >
                @wako.vision
              </a>
              .
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full hover:bg-zinc-200 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
