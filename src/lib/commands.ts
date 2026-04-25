import type { PortfolioData, TerminalLine } from "@/types";

type CommandResult = Omit<TerminalLine, "id">[];

function line(content: string, type: TerminalLine["type"] = "output"): Omit<TerminalLine, "id"> {
  return { type, content };
}

export function runCommand(
  raw: string,
  data: PortfolioData
): CommandResult | null {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const command = cmd.toLowerCase();

  switch (command) {
    case "help":
      return handleHelp();
    case "about":
      return handleAbout(data);
    case "projects":
      return handleProjects(data, args);
    case "skills":
      return handleSkills(data);
    case "experience":
      return handleExperience(data);
    case "education":
      return handleEducation(data);
    case "awards":
      return handleAwards(data);
    case "contact":
      return handleContact(data);
    case "open":
      return handleOpen(args, data);
    case "clear":
      return null; // special: caller handles clear
    case "":
      return [];
    default:
      return [
        line(
          `command not found: ${cmd}. Type 'help' to see available commands.`,
          "error"
        ),
      ];
  }
}

function handleHelp(): CommandResult {
  return [
    line(""),
    line("Available commands:"),
    line(""),
    line("  about        — who I am"),
    line("  projects     — things I've built"),
    line("  skills       — technologies I use"),
    line("  experience   — work history"),
    line("  education    — academic background"),
    line("  awards       — recognitions"),
    line("  contact      — get in touch"),
    line("  open <name>  — open a link (github, linkedin, cv)"),
    line("  clear        — clear the terminal"),
    line("  help         — show this message"),
    line(""),
  ];
}

function handleAbout(data: PortfolioData): CommandResult {
  return [
    line(""),
    line(`${data.name}`),
    line(`${data.role} · ${data.location}`),
    line(""),
    ...data.about.split("\n").map((l) => line(l)),
    line(""),
    line(`email    ${data.email}`),
    ...(data.github ? [line(`github   ${data.github}`)] : []),
    ...(data.linkedin ? [line(`linkedin ${data.linkedin}`)] : []),
    line(""),
  ];
}

function handleProjects(data: PortfolioData, args: string[]): CommandResult {
  if (args.length > 0) {
    const name = args.join(" ").toLowerCase();
    const project = data.projects.find((p) =>
      p.name.toLowerCase().includes(name)
    );
    if (!project) {
      return [line(`project not found: ${args.join(" ")}`, "error")];
    }
    return [
      line(""),
      line(`${project.name}  (${project.year})`),
      line(`${project.description}`),
      line(`tech: ${project.tech.join(", ")}`),
      ...(project.url ? [line(`url:  ${project.url}`)] : []),
      line(""),
    ];
  }

  return [
    line(""),
    ...data.projects.flatMap((p, i) => [
      line(`[${i + 1}] ${p.name}  (${p.year})`),
      line(`    ${p.description}`),
      line(`    ${p.tech.join(", ")}`),
      line(""),
    ]),
  ];
}

function handleSkills(data: PortfolioData): CommandResult {
  return [
    line(""),
    ...data.skills.flatMap((s) => [
      line(`${s.category}`),
      line(`  ${s.items.join("  ·  ")}`),
      line(""),
    ]),
  ];
}

function handleExperience(data: PortfolioData): CommandResult {
  if (data.experience.length === 0) {
    return [line(""), line("No experience entries yet."), line("")];
  }
  return [
    line(""),
    ...data.experience.flatMap((e) => [
      line(`${e.company}  ·  ${e.role}`),
      line(`${e.period}`),
      line(`${e.description}`),
      line(""),
    ]),
  ];
}

function handleEducation(data: PortfolioData): CommandResult {
  return [
    line(""),
    ...data.education.flatMap((e) => [
      line(`${e.institution}`),
      line(`${e.degree}  ·  ${e.period}`),
      ...(e.gpa ? [line(`GPA: ${e.gpa}`)] : []),
      line(""),
    ]),
  ];
}

function handleAwards(data: PortfolioData): CommandResult {
  if (data.awards.length === 0) {
    return [line(""), line("No awards listed yet."), line("")];
  }
  return [
    line(""),
    ...data.awards.flatMap((a) => [
      line(`★  ${a.name}  (${a.year})`),
      line(`   ${a.issuer}`),
      ...(a.description ? [line(`   ${a.description}`)] : []),
      line(""),
    ]),
  ];
}

function handleContact(data: PortfolioData): CommandResult {
  return [
    line(""),
    line(`email    ${data.email}`),
    ...(data.github ? [line(`github   ${data.github}`)] : []),
    ...(data.linkedin ? [line(`linkedin ${data.linkedin}`)] : []),
    line(""),
  ];
}

function handleOpen(args: string[], data: PortfolioData): CommandResult {
  const target = args[0]?.toLowerCase();
  const urls: Record<string, string | undefined> = {
    github: data.github,
    linkedin: data.linkedin,
    cv: data.cvUrl,
    email: `mailto:${data.email}`,
  };

  if (!target) {
    return [
      line("Usage: open <github|linkedin|cv|email>", "error"),
    ];
  }

  const url = urls[target];
  if (!url) {
    return [
      line(
        `unknown target '${target}'. Try: ${Object.keys(urls).join(", ")}`,
        "error"
      ),
    ];
  }

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return [line(`opening ${target}...`)];
}
