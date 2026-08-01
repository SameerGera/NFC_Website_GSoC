"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Tab = "overview" | "projects" | "certificates" | "achievements";

interface Props {
  onTabChange: (tab: Tab) => void;
  activeTab?: Tab;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
];

export default function ProfileTabs({ onTabChange, activeTab }: Props) {
  const [internalActive, setInternalActive] = useState<Tab>(activeTab ?? "overview");
  const active = activeTab ?? internalActive;
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<Tab, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (activeTab) setInternalActive(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const btn = tabRefs.current.get(active);
    const container = scrollRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicatorStyle({
        left: btnRect.left - containerRect.left + container.scrollLeft,
        width: btnRect.width,
      });
    }
  }, [active]);

  const handleTab = (tab: Tab) => {
    setInternalActive(tab);
    onTabChange(tab);
    const btn = tabRefs.current.get(tab);
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div
      ref={scrollRef}
      className="relative flex overflow-x-auto hide-scrollbar rounded-2xl bg-card border border-card-border p-1"
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl bg-primary shadow-md"
        animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
          onClick={() => handleTab(tab.id)}
          className={`relative z-10 flex-1 text-center whitespace-nowrap rounded-xl py-2 px-3.5 text-[13px] font-medium transition-colors duration-200 shrink-0 ${
            active === tab.id
              ? "text-white"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
