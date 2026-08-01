"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/types/member";
import { BentoItem } from "./BentoGrid";

interface Props {
  achievements?: Achievement[];
}

export default function ProfileAchievements({ achievements }: Props) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <BentoItem className="p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-text-primary">Achievements</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory touch-pan-x hide-scrollbar pb-1 -mx-1 px-1">
        {achievements.map((achievement, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group min-w-[200px] max-w-[260px] flex-shrink-0 snap-start flex flex-col gap-2 rounded-2xl bg-primary-bg/30 border border-card-border p-3 transition-colors duration-200 hover:border-primary/30 dark:bg-slate-800/50 dark:border-slate-700/50 cursor-default"
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
            <div className="min-w-0">
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
    </BentoItem>
  );
}
