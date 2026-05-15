import type { SectionId } from "@/types";

export type Section = {
  key: SectionId;
  label: string;
  icon: string;
  cmd: string;
};

export const SECTIONS: Section[] = [
  { key: "about",      label: "About",      icon: "◆", cmd: "about" },
  { key: "projects",   label: "Projects",   icon: "❯", cmd: "projects" },
  { key: "skills",     label: "Skills",     icon: "✎", cmd: "skills" },
  { key: "experience", label: "Experience", icon: "⌘", cmd: "experience" },
  { key: "education",  label: "Education",  icon: "✦", cmd: "education" },
  { key: "awards",     label: "Awards",     icon: "★", cmd: "awards" },
  { key: "contact",    label: "Contact",    icon: "✉", cmd: "contact" },
  { key: "cv",         label: "CV",         icon: "▤", cmd: "cv" },
];
