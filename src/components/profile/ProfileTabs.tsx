"use client";

import { useState } from "react";

type Tab = "overview" | "projects" | "certificates" | "achievements";

interface Props {
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "achievements", label: "Achievements" },
];

export default function ProfileTabs({ onTabChange }: Props) {
  const [active, setActive] = useState<Tab>("overview");

  const handleTab = (tab: Tab) => {
    setActive(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex overflow-x-auto hide-scrollbar rounded-2xl bg-card border border-card-border p-1 gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTab(tab.id)}
          className={`whitespace-nowrap rounded-xl py-2 px-3.5 text-[13px] font-medium transition-all duration-200 shrink-0 ${
            active === tab.id
              ? "bg-primary text-white shadow-sm"
              : "text-text-secondary active:bg-primary/5"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
