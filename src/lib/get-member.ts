import "server-only";

import { getAdminDb } from "@/lib/firebase-admin";
import { Member } from "@/types/member";

export async function getMember(memberId: string): Promise<Member | null> {
  try {
    const doc = await getAdminDb().collection("members").doc(memberId).get();
    if (!doc.exists) return null;
    const raw = doc.data();
    if (!raw) return null;

    const social = raw.social as Record<string, string> | undefined;

    const achievements = Array.isArray(raw.achievements)
      ? raw.achievements
          .filter((a: unknown) => a && typeof a === "object" && "title" in (a as Record<string, unknown>))
          .map((a: Record<string, string>) => ({
            title: a.title ?? "",
            event: a.event ?? "",
            date: a.date ?? "",
            description: a.description ?? "",
          }))
      : [];

    const certificates = Array.isArray(raw.certificates)
      ? raw.certificates
          .filter((c: unknown) => c && typeof c === "object" && "name" in (c as Record<string, unknown>))
          .map((c: Record<string, string>) => ({
            name: c.name ?? "",
            issuingOrganization: c.issuingOrganization ?? "",
            issueDate: c.issueDate ?? "",
          }))
      : [];

    const projects = Array.isArray(raw.projects)
      ? raw.projects
          .filter((p: unknown) => p && typeof p === "object" && "title" in (p as Record<string, unknown>))
          .map((p: Record<string, unknown>) => ({
            title: (p.title as string) ?? "",
            description: (p.description as string) ?? "",
            technologies: Array.isArray(p.technologies) ? (p.technologies as string[]) : [],
            githubLink: (p.githubLink as string) ?? "",
            liveDemo: (p.liveDemo as string) ?? "",
          }))
      : [];

    const member: Member = {
      username: raw.username ?? doc.id,
      name: raw.name ?? "",
      email: raw.email ?? "",
      phone: raw.phone ?? "",
      clubrole: raw.clubrole ?? "",
      department: raw.department ?? "",
      year: raw.year ?? "",
      bio: raw.bio ?? "",
      "registration number": raw["registration number"] ?? "",
      "profile Image": raw["profile Image"] ?? "",
      skills: Array.isArray(raw.skills) ? raw.skills.filter((s: unknown) => typeof s === "string" && s.trim()) : [],
      projects,
      certificates,
      achievements,
      github: raw.github ?? "",
      linkedin: social?.LinkedIn ?? social?.linkedin ?? raw.linkedin ?? "",
      portfolio: raw.portfolio ?? "",
      status: raw.status ?? "Verified",
    };

    return member;
  } catch {
    return null;
  }
}
