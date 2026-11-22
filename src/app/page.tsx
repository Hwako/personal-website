import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import { GitHubIcon, XIcon, LinkedInIcon } from "@/components/BrandIcons";
import { Camera, Mail } from "lucide-react";

const projects = [
  { name: "Paevos", logo: "/logos/paevos-green.png", category: "In production", description: "A personal finance app I’m building.", href: "https://paevos.com", linkLabel: "Visit paevos.com", artwork: "paevos" as const },
  { name: "Minara", logo: "/logos/minara.png", category: "Live on the App Store", description: "A home for local mosque events, daily reflections, and prayer times.", href: "https://apps.apple.com/us/app/minara-muslim-community/id6798981059", linkLabel: "View on the App Store", artwork: "minara" as const },
  { name: "SignSpace", logo: null, category: "1st place · Buildathon", description: "A real-time ASL tutor for Apple Vision Pro, with feedback you can see.", href: "https://github.com/musnom/SignSpace", linkLabel: "View on GitHub", artwork: "signspace" as const },
  { name: "AI Research Agent", logo: null, category: "AI & automation", description: "An autonomous agent that finds, summarizes, and reviews daily research.", href: "https://github.com/Hwako/ai-research-agent", linkLabel: "View on GitHub", artwork: "research" as const },

];

const experience = [
  { company: "Trojan Sports Lab", role: "Data Analyst", period: "2025 — present", description: "Turning real-time athletic data into decisions coaches can act on.", logo: "/logos/tsl.png" },
  { company: "IPSERLab", role: "Product Management Intern", period: "Summer 2025", description: "Market research, roadmaps, and sprints for a B2B eCommerce product.", logo: "/logos/ipser.jpg" },
  { company: "Beats by Dre", role: "Data Analytics & Insights Extern", period: "Spring 2025", description: "Finding the story in consumer behavior data and sharing it with stakeholders.", logo: "/logos/beats.png" },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#projects">Skip to content</a>
      <main id="top" className="portfolio-layout">
        <aside className="identity-sidebar" aria-label="About Hamza">
          <div className="identity-content">
            <Image src="/photo.jpg" alt="Hamza Wako" width={76} height={76} priority className="profile-photo" style={{ borderRadius: "50%" }} />
            <h1>Hamza Wako<span>.</span></h1>
            <p className="identity-role">AI / Product / Data</p>
            <p className="identity-bio">I love building and using AI to bring ideas to life. Anything involving creativity, vision, or photography, I’m all ears.</p>
            <div className="identity-meta"><span>Los Angeles, CA</span><span className="school-detail"><Image src="/logos/usc.png" alt="USC" width={32} height={13} /> &apos;27 <span>· Data Science</span></span></div>
            <nav className="section-nav" aria-label="Sections"><a href="#projects">Projects <span>↘</span></a><a href="#experience">Experience <span>↘</span></a></nav>
            <nav className="social-links" aria-label="Social links">
              <a href="https://github.com/Hwako" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><GitHubIcon /></a>
              <a href="https://linkedin.com/in/hwako1" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><LinkedInIcon /></a>
              <a href="https://x.com/1pluswako" target="_blank" rel="noreferrer" aria-label="X — @1pluswako" title="X"><XIcon /></a>
              <a href="mailto:hwako@usc.edu" aria-label="Email Hamza" title="Email"><Mail size={18} strokeWidth={1.5} /></a>
              <a href="https://www.instagram.com/wako.vision" target="_blank" rel="noreferrer" aria-label="Photography on Instagram" title="Photography"><Camera size={18} strokeWidth={1.5} /></a>
            </nav>
          </div>
          <p className="sidebar-footer">© {new Date().getFullYear()} Hamza Wako</p>
        </aside>
        <div className="work-column">
          <section id="projects" className="list-section" aria-labelledby="projects-heading">
            <div className="section-heading"><h2 id="projects-heading">Projects</h2></div>
            <div className="project-list">
              {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
            </div>
          </section>

          <section id="experience" className="list-section" aria-labelledby="experience-heading">
            <div className="section-heading"><h2 id="experience-heading">Experience</h2></div>
            <div className="project-list">
              {experience.map((item) => <ProjectCard key={item.company} project={{ name: item.role, category: item.company, description: `${item.period}. ${item.description}`, logo: item.logo, artwork: "experience" }} />)}
            </div>
          </section>

          <footer className="content-footer"><a href="#top">Back to top ↑</a></footer>
        </div>
      </main>
    </>
  );
}
