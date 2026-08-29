"use client";

import { motion } from "framer-motion";
import { useState } from "react";

function CompanyLogo({
  logo,
  name,
  initials,
}: {
  logo: string;
  name: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-9 h-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-500 shrink-0 font-mono">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-lg object-contain border border-zinc-100 bg-white p-0.5 shrink-0 group-hover:border-amber-200 transition-colors"
    />
  );
}

const skills = [
  "Python", "SQL", "C++", "Machine Learning", "Data Visualization",
  "Product Strategy", "Agile", "Cross-Team Collaboration", "Multilingual",
  "Agentic AI", "MS Suite",
];

const experiences = [
  {
    role: "Data Analyst",
    company: "Trojan Sports Lab",
    logo: "/logos/tsl.png",
    initials: "TSL",
    location: "Los Angeles, CA",
    period: "Aug 2025 to Present",
    bullet:
      "Collecting real-time athletic data and building the systems that turn it into decisions coaches actually act on.",
  },
  {
    role: "Product Management Intern",
    company: "IPSERLab",
    logo: "/logos/ipser.jpg",
    initials: "IP",
    location: "Remote",
    period: "Jun to Aug 2025",
    bullet:
      "Worked across teams to take a B2B eCommerce product from idea to execution. Ran sprints, dug into market research, and kept the roadmap moving in the right direction.",
  },
  {
    role: "Data Analytics & Insights Extern",
    company: "Beats by Dre",
    logo: "/logos/beats.png",
    initials: "BB",
    location: "Remote",
    period: "Feb to May 2025",
    bullet:
      "Dug into consumer behavior data to find what people actually cared about and got in the room with senior stakeholders to make sure that story landed.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-16 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#fafaf9] via-[#fdf6ec] to-[#fafaf9] border-b border-zinc-200"
    >
      <div className="absolute top-1/3 -left-32 w-[380px] h-[380px] bg-amber-100/50 rounded-full blur-[100px]" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="flex w-fit items-center text-amber-700 font-mono text-[11px] font-bold tracking-widest uppercase bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-4">
            experience
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight leading-[1.05]">
            Where I&apos;ve <span className="text-amber-600">been</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative py-4 -mx-3 px-3 border-b border-zinc-200 first:border-t hover:bg-amber-50/40 transition-colors rounded-md"
            >
              <span className="absolute left-[20px] top-0 bottom-0 w-px bg-zinc-200 z-0" aria-hidden />
              <div className="relative z-10 flex items-start gap-3.5">
                <CompanyLogo
                  logo={exp.logo}
                  name={exp.company}
                  initials={exp.initials}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {exp.role}
                      </h3>
                      <span className="text-zinc-400 text-sm">
                        @ {exp.company}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-400 font-mono shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {exp.bullet}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10"
        >
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-3">
            Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
