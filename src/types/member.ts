export type MemberStatus = "Verified" | "Unverified" | "Inactive";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveDemo: string;
}

export interface Certificate {
  name: string;
  issuingOrganization: string;
  issueDate: string;
}

export interface Achievement {
  title: string;
  event: string;
  date: string;
  description: string;
}

export interface Member {
  name: string;
  memberId: string;
  registrationNumber: string;
  department: string;
  year: string;
  role: string;
  profileImage: string;
  bio: string;
  github: string;
  linkedin: string;
  portfolio: string;
  skills: string[];
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  status: MemberStatus;
}
