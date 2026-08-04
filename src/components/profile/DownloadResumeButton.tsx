"use client";

import { motion } from "framer-motion";

export default function DownloadResumeButton() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-bg/50 border border-primary/20 px-4 py-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/10 active:shadow-none"
    >
      <svg
        className="h-[18px] w-[18px]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Resume
    </motion.button>
  );
}
