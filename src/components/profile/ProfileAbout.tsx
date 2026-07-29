"use client";

import { motion } from "framer-motion";

interface Props {
  bio?: string;
}

export default function ProfileAbout({ bio }: Props) {
  if (!bio) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-card border border-card-border p-4"
    >
      <div className="mb-2.5 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-text-primary">About Me</h2>
      </div>
      <p className="text-[13px] leading-relaxed text-text-secondary">{bio}</p>
    </motion.div>
  );
}
