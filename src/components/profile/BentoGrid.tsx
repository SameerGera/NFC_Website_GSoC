"use client";

import { motion } from "framer-motion";

const bentoVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={bentoVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {children}
    </motion.div>
  );
}

export function BentoItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`bg-white/80 border border-amber-200/50 shadow-sm dark:bg-slate-900/80 dark:border-slate-800/80 rounded-3xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
