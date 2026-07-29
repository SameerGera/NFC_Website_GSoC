"use client";

import { useState } from "react";
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

export default function ProfileTabsWrapper({ member }: Props) {
  const [tab, setTab] = useState<"overview" | "projects" | "certificates" | "achievements">("overview");

  return (
    <>
      <ProfileTabs onTabChange={setTab} />

      <div className="mt-4 space-y-4">
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
      </div>
    </>
  );
}
