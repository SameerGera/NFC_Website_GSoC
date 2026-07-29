"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/types/member";

interface Props {
  achievements?: Achievement[];
}

export default function ProfileAchievements({ achievements }: Props) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl bg-card border border-card-border p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-text-primary">Achievements</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {achievements.map((achievement, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: "easeOut" }}
            whileHover={{ y: -2, boxShadow: "0 4px 20px rgba(37, 99, 235, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col sm:flex-row items-start gap-2.5 rounded-xl bg-primary-bg/30 border border-card-border p-3 transition-colors duration-200 hover:border-primary/30 cursor-default"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10"
            >
              <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-text-primary">{achievement.title}</p>
              <p className="text-[11px] text-text-secondary">
                {achievement.event}{achievement.date ? ` · ${achievement.date}` : ""}
              </p>
              {achievement.description && (
                <p className="mt-0.5 text-[11px] text-text-secondary line-clamp-2">{achievement.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
