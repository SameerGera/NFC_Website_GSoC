"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/member";
import { BentoItem } from "./BentoGrid";

interface Props {
  projects?: Project[];
}

export default function ProfileProjects({ projects }: Props) {
  if (!projects || projects.length === 0) return null;

  return (
    <BentoItem className="p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-text-primary">Projects</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory touch-pan-x hide-scrollbar pb-1 -mx-1 px-1">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group min-w-[200px] max-w-[240px] flex-shrink-0 snap-start rounded-2xl bg-primary-bg/50 border border-card-border p-3 transition-colors duration-200 hover:border-primary/30 dark:bg-slate-800/50 dark:border-slate-700/50"
          >
            <div className="mb-2 flex h-20 items-center justify-center rounded-xl bg-card border border-card-border overflow-hidden dark:bg-slate-900/80 dark:border-slate-700/50">
              <motion.svg
                className="h-7 w-7 text-primary/30 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </motion.svg>
            </div>
            <h3 className="mb-0.5 text-[13px] font-semibold text-text-primary truncate">{project.title}</h3>
            <p className="mb-1.5 text-[11px] text-text-secondary line-clamp-2">{project.description}</p>
            <div className="mb-1.5 flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-card border border-card-border px-1.5 py-0.5 text-[9px] font-medium text-text-secondary dark:bg-slate-800 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2.5 text-[11px]">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary transition-all duration-200 hover:underline hover:text-primary-light"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary transition-all duration-200 hover:underline hover:text-primary-light"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </BentoItem>
  );
}
