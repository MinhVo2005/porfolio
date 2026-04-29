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
    year: string;
    description: string;
    tech: string[];
    url?: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa?: string;
  }[];
  awards: {
    name: string;
    year: string;
    issuer: string;
    description?: string;
  }[];
};
