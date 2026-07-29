"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Member } from "@/types/member";
import ProfileTabs from "@/components/profile/ProfileTabs";
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

const contentVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function ProfileTabsWrapper({ member }: Props) {
  const [tab, setTab] = useState<TabKey>("overview");

  return (
    <>
      <ProfileTabs onTabChange={setTab} />

      <div className="mt-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            {tab === "overview" && (
              <>
                <ProfileAbout bio={member.bio} />
                <ProfileSkills skills={member.skills} />
                <MemberIdCard member={member} />
                <ProfileClubRole member={member} />
              </>
            )}
            {tab === "projects" && (
              <ProfileProjects projects={member.projects} />
            )}
            {tab === "certificates" && (
              <ProfileCertificates certificates={member.certificates} />
            )}
            {tab === "achievements" && (
              <ProfileAchievements achievements={member.achievements} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
