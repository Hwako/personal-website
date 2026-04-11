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
      className="w-9 h-9 rounded-lg object-contain border border-zinc-100 bg-white p-0.5 shrink-0"
    />
  );
}

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
      className="py-16 px-6 md:px-16 bg-[#fafaf9] border-b border-zinc-200"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mb-3">
            / experience
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Where I&apos;ve been
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
              className="group py-4 border-b border-zinc-200 first:border-t"
            >
              <div className="flex items-start gap-3.5">
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
      </div>
    </section>
  );
}
