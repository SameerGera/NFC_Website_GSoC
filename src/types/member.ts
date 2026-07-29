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
  username: string;
  name: string;
  email: string;
  phone: string;
  clubrole: string;
  department: string;
  year: string;
  bio: string;
  "registration number": string;
  "profile Image": string;
  skills?: string[];
  projects?: Project[];
  certificates?: Certificate[];
  achievements?: Achievement[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  status?: MemberStatus;
}
