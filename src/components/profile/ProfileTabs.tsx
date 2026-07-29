"use client";

import { useState } from "react";

type Tab = "overview" | "projects" | "credentials";

interface Props {
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" },
];

export default function ProfileTabs({ onTabChange }: Props) {
  const [active, setActive] = useState<Tab>("overview");

  const handleTab = (tab: Tab) => {
    setActive(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex gap-2 rounded-full bg-card border border-card-border p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTab(tab.id)}
          className={`flex-1 rounded-full py-2.5 px-4 text-sm font-medium transition-all duration-200 ${
            active === tab.id
              ? "bg-primary text-white shadow-md"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
