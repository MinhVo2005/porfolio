import type { PortfolioData } from "@/types";

export const portfolio: PortfolioData = {
  name: "Your Name",
  username: "user",
  hostname: "portfolio",
  role: "Software Engineer",
  location: "Your City, Country",
  email: "you@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",

  about: `I'm a software engineer who loves building things for the web.
Passionate about clean code, great UX, and open-source.`,

  projects: [
    {
      name: "Project One",
      description: "A short description of what this project does.",
      tech: ["TypeScript", "React", "Next.js"],
      url: "https://github.com/yourusername/project-one",
      year: 2024,
    },
    {
      name: "Project Two",
      description: "Another interesting project you built.",
      tech: ["Python", "FastAPI", "PostgreSQL"],
      url: "https://github.com/yourusername/project-two",
      year: 2023,
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Go"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"],
    },
    {
      category: "Tools",
      items: ["Git", "Docker", "Linux", "VS Code"],
    },
  ],

  experience: [
    {
      company: "Some Company",
      role: "Software Engineer Intern",
      period: "May 2024 – Aug 2024",
      description: "Worked on backend services and improved API performance.",
    },
  ],

  education: [
    {
      institution: "Your University",
      degree: "B.Sc. Computer Science",
      period: "2022 – 2026",
      gpa: "3.95 / 4.00",
    },
  ],

  awards: [
    {
      name: "Hackathon First Place",
      issuer: "Some Hackathon",
      year: 2024,
      description: "Won first place out of 200 teams.",
    },
    {
      name: "Dean's List",
      issuer: "Your University",
      year: 2024,
    },
  ],

  stats: {
    projects: 2,
    awards: 2,
    gpa: "3.95 / 4.00",
  },
};
