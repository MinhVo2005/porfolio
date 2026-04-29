import { create } from "zustand";
import type { UserRepository } from "@/repositories/userRepository";
import type { PortfolioData } from "@/types";

type FullUser = NonNullable<Awaited<ReturnType<typeof UserRepository.findFirst>>>;

type Serialized<T> = T extends Date
  ? string
  : T extends (infer U)[]
  ? Serialized<U>[]
  : T extends object
  ? { [K in keyof T]: Serialized<T[K]> }
  : T;

type SerializedUser = Serialized<FullUser> & { banner: string };

function deriveHostname(email: string): string {
  const domain = email.split("@")[1] ?? "";
  const parts = domain.split(".");
  return parts.length >= 2 ? parts[parts.length - 2] : "portfolio";
}

function formatPeriod(start: string, end: string | null): string {
  const startYear = new Date(start).getFullYear();
  const endStr = end ? new Date(end).getFullYear().toString() : "present";
  return `${startYear} – ${endStr}`;
}

function mapToPortfolio(user: SerializedUser): PortfolioData {
  const email = user.contacts.find((c) => c.type === "EMAIL")?.contactInfo ?? "";
  const github = user.contacts.find((c) => c.type === "GITHUB")?.contactInfo;
  const linkedin = user.contacts.find((c) => c.type === "LINKEDIN")?.contactInfo;
  const cvUrl = user.cvs.find((c) => c.lang === "en")?.url ?? user.cvs[0]?.url;

  const skillMap = new Map<string, string[]>();
  for (const s of user.skills) {
    skillMap.set(s.category, [...(skillMap.get(s.category) ?? []), s.name]);
  }

  return {
    name: user.name,
    banner: user.banner,
    role: user.jobTitle,
    location: user.location,
    about: user.description,
    email,
    github,
    linkedin,
    cvUrl,
    username: user.name.split(" ")[0].toLowerCase(),
    hostname: deriveHostname(email),
    stats: {
      projects: user.projects.length,
      awards: user.awards.length,
      gpa: user.educations[0]?.gpa != null
        ? user.educations[0].gpa.toFixed(2)
        : "—",
    },
    projects: user.projects.map((p) => ({
      name: p.name,
      year: "",
      description: p.description,
      tech: p.skills.map((s) => s.name),
      url: p.githubUrl ?? undefined,
    })),
    skills: Array.from(skillMap.entries()).map(([category, items]) => ({
      category,
      items,
    })),
    experience: user.experiences.map((e) => ({
      company: e.company,
      role: e.position,
      period: formatPeriod(e.startDate, e.endDate),
      description: e.description,
    })),
    education: user.educations.map((e) => ({
      institution: e.school,
      degree: `${e.degree} in ${e.major}`,
      period: formatPeriod(e.startDate, e.graduationDate),
    })),
    awards: user.awards.map((a) => ({
      name: a.name,
      year: new Date(a.date).getFullYear().toString(),
      issuer: a.event,
      description: a.description,
    })),
  };
}

type UserStore = {
  user: PortfolioData | null;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    const res = await fetch("/api");
    const raw: SerializedUser = await res.json();
    set({ user: mapToPortfolio(raw) });
  },
}));
