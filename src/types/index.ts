export type SectionId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "education"
  | "awards"
  | "contact"
  | "cv";

export interface SidebarSection {
  id: SectionId;
  label: string;
  number: number;
  icon: string;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "banner" | "welcome";
  content: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  year: number;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa?: string;
}

export interface Award {
  name: string;
  issuer: string;
  year: number;
  description?: string;
}

export interface PortfolioData {
  name: string;
  username: string;
  hostname: string;
  role: string;
  location: string;
  email: string;
  github?: string;
  linkedin?: string;
  about: string;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  awards: Award[];
  cvUrl?: string;
  stats: {
    projects: number;
    awards: number;
    gpa: string;
  };
}
