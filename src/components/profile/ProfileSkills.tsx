"use client";

import { motion } from "framer-motion";
import { BentoItem } from "./BentoGrid";

interface Props {
  skills?: string[];
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: 0.05 + i * 0.03, type: "spring" as const, stiffness: 400, damping: 25 },
  }),
};

export default function ProfileSkills({ skills }: Props) {
  if (!skills || skills.filter((s) => s.trim()).length === 0) return null;

  return (
    <BentoItem className="p-4">
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-text-primary">Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            custom={i}
            variants={pillVariants}
            initial="hidden"
            animate="visible"
            className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary dark:bg-orange-500/10 dark:text-orange-300 cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </BentoItem>
  );
}
