import type { ReactNode } from "react";

export type HistoryEntry = {
  input: string;
  title: string;
  card: ReactNode;
};

export type SectionId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "awards"
  | "contact"
  | "cv";

export type SidebarSection = {
  id: SectionId;
  label: string;
  number: number;
  icon: string;
};

export type TerminalLine = {
  id: string;
  type: "output" | "input" | "error" | "banner" | "welcome";
  content: string;
};

export type SkillLang = {
  name: string;
  pct: number;
  level: 'primary' | 'proficient' | 'intermediate';
};

export type SkillGroup =
  | { key: 'languages'; label: string; primary: SkillLang[]; also: string[] }
  | { key: string; label: string; items: string[] };

export type PortfolioData = {
  name: string;
  banner: string;
  role: string;
  location: string;
  about: string;
  email: string;
  github?: string;
  linkedin?: string;
  cvUrl?: string;
  username: string;
  hostname: string;
  stats: {
    projects: number;
    awards: number;
    gpa: string;
  };
  projects: {
    name: string;
    displayName: string;
    description: string;
    highlights: string[];
    status: string;
    category: string;
    skills: string[];
    img: string[];
    url?: string;
  }[];
  skills: SkillGroup[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    minor?: string;
    gpa?: string;
    period: string;
  }[];
  awards: {
    name: string;
    year: string;
    issuer: string;
    description?: string;
  }[];
};
