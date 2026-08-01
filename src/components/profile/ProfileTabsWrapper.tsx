"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Member } from "@/types/member";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { BentoGrid } from "@/components/profile/BentoGrid";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileSkills from "@/components/profile/ProfileSkills";
import MemberIdCard from "@/components/profile/MemberIdCard";
import ProfileClubRole from "@/components/profile/ProfileClubRole";
import ProfileProjects from "@/components/profile/ProfileProjects";
import ProfileCertificates from "@/components/profile/ProfileCertificates";
import ProfileAchievements from "@/components/profile/ProfileAchievements";

interface Props {
  member: Member;
}

type TabKey = "overview" | "projects" | "certificates" | "achievements";

const tabOrder: TabKey[] = ["overview", "projects", "certificates", "achievements"];

const contentVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function ProfileTabsWrapper({ member }: Props) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [direction, setDirection] = useState(0);

  const navigateTab = useCallback((newTab: TabKey) => {
    setDirection(tabOrder.indexOf(newTab) > tabOrder.indexOf(tab) ? 1 : -1);
    setTab(newTab);
  }, [tab]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    const currentIndex = tabOrder.indexOf(tab);

    if (info.offset.x < -swipeThreshold && currentIndex < tabOrder.length - 1) {
      navigateTab(tabOrder[currentIndex + 1]);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      navigateTab(tabOrder[currentIndex - 1]);
    }
  };

  return (
    <>
      <ProfileTabs onTabChange={navigateTab} />

      <div className="mt-3">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={tab}
            custom={direction}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="touch-pan-y"
          >
            {tab === "overview" && (
              <BentoGrid>
                <ProfileAbout bio={member.bio} />
                <ProfileSkills skills={member.skills} />
                <MemberIdCard member={member} />
                <ProfileClubRole member={member} />
              </BentoGrid>
            )}
            {tab === "projects" && (
              <BentoGrid>
                <ProfileProjects projects={member.projects} />
              </BentoGrid>
            )}
            {tab === "certificates" && (
              <BentoGrid>
                <ProfileCertificates certificates={member.certificates} />
              </BentoGrid>
            )}
            {tab === "achievements" && (
              <BentoGrid>
                <ProfileAchievements achievements={member.achievements} />
              </BentoGrid>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
