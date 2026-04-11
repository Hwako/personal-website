"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Hwako",
    Icon: GitHubIcon,
    handle: "@Hwako",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hwako1",
    Icon: LinkedInIcon,
    handle: "hwako1",
  },
  {
    label: "Email",
    href: "mailto:hwako@usc.edu",
    Icon: ({ size }: { size?: number }) => <Mail size={size} />,
    handle: "hwako@usc.edu",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-6 md:px-16 bg-[#fafaf9]">
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
            / contact
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Let&apos;s connect.
          </h2>
        </motion.div>

        <div className="space-y-0">
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="group flex items-center justify-between py-4 border-b border-zinc-200 first:border-t hover:pl-1 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="text-zinc-400 group-hover:text-zinc-900 transition-colors">
                  <social.Icon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium text-zinc-800 group-hover:text-zinc-900 transition-colors">
                    {social.label}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">{social.handle}</div>
                </div>
              </div>
              <ArrowUpRight
                size={15}
                className="text-zinc-300 group-hover:text-zinc-700 transition-colors"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
