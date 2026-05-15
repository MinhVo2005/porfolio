import { PrismaClient, Proficiency } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  // Clean existing data
  await db.skill.deleteMany();
  await db.award.deleteMany();
  await db.education.deleteMany();
  await db.experience.deleteMany();
  await db.project.deleteMany();
  await db.contact.deleteMany();
  await db.cV.deleteMany();
  await db.user.deleteMany();

  // Create user
  const user = await db.user.create({
    data: {
      name: "Minh Vo",
      location: "Montreal, QC",
      jobTitle: "Software Engineering Student",
      description:
        "Software Engineering student at McGill University with a 3.95/4.0 GPA. Built and deployed web applications, self-hosted infrastructure, and IoT systems. Hands-on experience in full-stack development, embedded systems, and DevOps. Hackathon winner (1st place McGill CodeJam 15, 3rd place ConuHacks X). Fluent in English, French, and Vietnamese.",
    },
  });

  // Contacts
  await db.contact.createMany({
    data: [
      { userId: user.id, type: "EMAIL",    contactInfo: "minh.vo2@mail.mcgill.ca" },
      { userId: user.id, type: "LINKEDIN", contactInfo: "https://www.linkedin.com/in/minh-vo-657b09324/" },
      { userId: user.id, type: "GITHUB",   contactInfo: "https://github.com/MinhVo2005" },
    ],
  });

  // CV
  await db.cV.create({
    data: { userId: user.id, lang: "en", url: "https://drive.google.com/file/d/11kFaVDhfzCGaBadSJkTdLj-GvqiVuFHk/view?usp=sharingaw" },
  });

  // Education
  await db.education.create({
    data: {
      userId:        user.id,
      school:        "McGill University",
      degree:        "B.Eng.",
      field:         "Software Engineering, Co-op",
      gpa:           3.95,
      startDate:     new Date("2024-09-01"),
      graduationDate: new Date("2028-04-30"),
    },
  });

  // Skills
  const skillData = [
    // Languages
    { name: "Python",       category: "Languages", proficiency: Proficiency.PRIMARY      },
    { name: "TypeScript",   category: "Languages", proficiency: Proficiency.PRIMARY      },
    { name: "JavaScript",   category: "Languages", proficiency: Proficiency.PRIMARY      },
    { name: "Java",         category: "Languages", proficiency: Proficiency.PROFICIENT   },
    { name: "C",            category: "Languages", proficiency: Proficiency.PROFICIENT   },
    { name: "C++",          category: "Languages", proficiency: Proficiency.PROFICIENT   },
    { name: "Lua",          category: "Languages", proficiency: Proficiency.INTERMEDIATE },
    { name: "Bash",         category: "Languages", proficiency: Proficiency.INTERMEDIATE },
    { name: "HTML",         category: "Languages", proficiency: Proficiency.INTERMEDIATE },
    { name: "CSS",          category: "Languages", proficiency: Proficiency.INTERMEDIATE },
    // Frameworks & Libraries
    { name: "ReactJS",      category: "Frameworks & Libraries" },
    { name: "NodeJS",       category: "Frameworks & Libraries" },
    { name: "Svelte",       category: "Frameworks & Libraries" },
    { name: "TailwindCSS",  category: "Frameworks & Libraries" },
    { name: "Flutter",      category: "Frameworks & Libraries" },
    { name: "OpenCV",       category: "Frameworks & Libraries" },
    { name: "YOLO",         category: "Frameworks & Libraries" },
    // DevOps & Infrastructure
    { name: "Docker",       category: "DevOps & Infrastructure" },
    { name: "Kubernetes",   category: "DevOps & Infrastructure" },
    { name: "Git",          category: "DevOps & Infrastructure" },
    { name: "Linux",        category: "DevOps & Infrastructure" },
    { name: "Traefik",      category: "DevOps & Infrastructure" },
    // Embedded Systems
    { name: "ESP-32",       category: "Embedded Systems" },
    { name: "C++ (Embedded)", category: "Embedded Systems" },
    { name: "BrickPi 3",    category: "Embedded Systems" },
    { name: "Raspberry Pi", category: "Embedded Systems" },
    // Tools
    { name: "VS Code",      category: "Tools" },
    { name: "Neovim",       category: "Tools" },
    { name: "IntelliJ",     category: "Tools" },
  ];

  const createdSkills = await Promise.all(
    skillData.map((s) => db.skill.create({ data: { ...s, userId: user.id } }))
  );

  const skill = (name: string) => {
    const s = createdSkills.find((sk) => sk.name === name);
    if (!s) throw new Error(`Skill not found: ${name}`);
    return { id: s.id };
  };

  // Experiences
  await db.experience.create({
    data: {
      userId:      user.id,
      company:     "ECSESS",
      position:    "Website Committee Member",
      description: "Maintained and scaled a production website serving 1,000+ daily users.",
      highlight:   [
        "Planned and designed pages using Svelte and TailwindCSS, improving visual presentation and responsiveness.",
        "Developed automated internal tools to handle bug reports and content management.",
        "Collaborated with the team using Git/GitHub, conducting code reviews and participating in pull request workflows.",
      ],
      startDate:   new Date("2024-09-01"),
      order:       0,
      skills:      { connect: [skill("Svelte"), skill("TailwindCSS"), skill("Git")] },
    },
  });

  await db.experience.create({
    data: {
      userId:      user.id,
      company:     "Bonjour Pho",
      position:    "Kitchen Assistant",
      description: "Worked in a fast-paced environment during peak service hours.",
      highlight:   [
        "Maintained speed, preparation, and organization under pressure.",
      ],
      startDate:   new Date("2025-01-01"),
      order:       1,
      skills:      { connect: [] },
    },
  });

  // Projects
  await db.project.create({
    data: {
      userId:      user.id,
      name:        "homeserver",
      displayName: "Home Server",
      category:    "infra",
      status:      "RUNNING",
      featured:    true,
      order:       0,
      img:         [],
      description: "Self-hosted K3S cluster on Debian, exposed through Cloudflare Tunnels.",
      highlights:  [
        "Orchestrated a self-hosted Kubernetes (K3S) cluster on Debian to deploy and manage containerized apps across multiple services.",
        "Configured remote SSH access on the local network and exposed services securely via Traefik reverse proxy + Cloudflare Tunnels.",
        "Containerized personal projects — Discord bots, home automation — with Docker for reproducible builds and service isolation.",
      ],
      skills:      { connect: [skill("Docker"), skill("Kubernetes"), skill("Linux"), skill("Bash"), skill("Traefik")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "fishy",
      displayName: "It's Getting Fishy",
      category:    "game",
      status:      "SHIPPED",
      featured:    true,
      order:       1,
      img:         [],
      description: "Fishing game for Playdate handhelds. 1st place at CodeJam 15.",
      highlights:  [
        "Built a fishing game for the Playdate handheld console in 48 hours at McGill CodeJam 15.",
        "Implemented real-time game loop, physics-based casting mechanics, and fish AI using the Playdate SDK in Lua.",
        "Won 1st place overall against 30+ teams at McGill CodeJam 15.",
      ],
      githubUrl: "https://devpost.com/software/it-s-getting-fishy?_gl=1*1f2cc0*_gcl_au*Mjc4MTExODE2LjE3Nzg1NDIwMDQ.*_ga*NTk2ODUyMzIyLjE3Nzg1NDIwMDU.*_ga_0YHJK3Y10M*czE3Nzg3NzQ3OTgkbzMkZzEkdDE3Nzg3NzQ4MTgkajQwJGwwJGgw",
      skills:      { connect: [skill("C"), skill("Lua")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "gardens",
      displayName: "TheGardens",
      category:    "iot",
      status:      "ARCHIVED",
      featured:    true,
      order:       2,
      img:         [
        "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/204/084/datas/original.jpeg",
        "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/204/085/datas/original.jpeg",
        "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/204/086/datas/original.jpeg",
      ],
      description: "IoT gesture-control glove + Flutter banking app. 3rd at ConuHacks X.",
      highlights:  [
        "Designed an IoT gesture-control glove using ESP-32 integrating MPU-9250 to track hand movement and cursor control via BLE.",
        "Programmed embedded firmware in C++, applying Kalman filter and gesture tracking algorithms for low-latency response.",
        "Developed a full-stack banking application in Flutter with a Python backend as a Desjardins sponsor challenge.",
        "Won 3rd place in the Desjardins Sponsor Challenge at ConuHacks X.",
      ],
      githubUrl: "https://devpost.com/software/thegardens?_gl=1*gc7zkz*_gcl_au*Mjc4MTExODE2LjE3Nzg1NDIwMDQ.*_ga*NTk2ODUyMzIyLjE3Nzg1NDIwMDU.*_ga_0YHJK3Y10M*czE3Nzg3NzQ3OTgkbzMkZzEkdDE3Nzg3NzQ4NTgkajYwJGwwJGgw",
      skills:      { connect: [skill("ESP-32"), skill("C++ (Embedded)"), skill("Flutter"), skill("Python")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "dpm",
      displayName: "DPM Delivery Robot",
      category:    "robotics",
      status:      "ARCHIVED",
      featured:    false,
      order:       3,
      img:         [],
      description: "Autonomous navigation for a LEGO delivery robot.",
      highlights:  [
        "Designed an autonomous navigation system for LEGO-based delivery robots using BrickPi 3, integrating ultrasonic and color sensors for obstacle avoidance.",
        "Implemented a multi-threaded Python control system on Raspberry Pi OS for concurrent sensor data processing and motor control.",
        "Developed a test suite to validate robot navigation, color detection, and delivery functionalities across multiple scenarios.",
      ],
      skills:      { connect: [skill("Python"), skill("BrickPi 3"), skill("Raspberry Pi"), skill("Git"), skill("Linux")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "msg",
      displayName: "Messaging App",
      category:    "web",
      status:      "SHIPPED",
      featured:    true,
      order:       4,
      img:         [],
      description: "Real-time messaging with auth, REST, and Pusher sockets.",
      highlights:  [
        "Handled authorization using bcryptJS password hashing, JWT session tokens, and SMTP for email verification.",
        "Developed a REST API with dynamic Express routing and integrated Pusher WebSockets for real-time message delivery.",
        "Built with ReactJS and TypeScript, deployed on Render (backend) and Vercel (frontend) with a MongoDB document schema.",
      ],
      skills:      { connect: [skill("ReactJS"), skill("TypeScript"), skill("NodeJS")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "ecsess",
      displayName: "ECSESS Website",
      category:    "web",
      status:      "SHIPPED",
      featured:    false,
      order:       5,
      img:         [],
      description: "Production site serving 1,000+ daily users across McGill ECSE.",
      highlights:  [
        "Maintained and scaled a production website serving 1,000+ daily users across McGill's ECSE student community.",
        "Designed and implemented pages using Svelte and TailwindCSS, improving visual presentation and mobile responsiveness.",
        "Developed automated internal tools to handle bug reports and content management workflows.",
      ],
      githubUrl: "https://ecsess.mcgilleus.ca",
      skills:      { connect: [skill("Svelte"), skill("TailwindCSS"), skill("Git")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "musicbot",
      displayName: "Discord Music Bot",
      category:    "bot",
      status:      "SHIPPED",
      featured:    false,
      order:       6,
      img:         [],
      description: "Search / play / queue / skip — a classic music bot done right.",
      highlights:  [
        "Developed a fully functional Discord bot with search, play, pause, skip, and queue management commands.",
        "Built with discord.js and YouTube search libraries, self-hosted on the home K3S cluster.",
        "Implemented persistent queue state and graceful disconnect handling for uninterrupted listening sessions.",
      ],
      skills:      { connect: [skill("JavaScript"), skill("NodeJS")] },
    },
  });

  // Awards
  await db.award.create({
    data: {
      userId:      user.id,
      name:        "It's Getting Fishy — 1st Place",
      event:       "McGill CodeJam 15",
      date:        new Date("2025-11-01"),
      description: "First place at McGill CodeJam 15 in Montreal, Quebec.",
    },
  });

  await db.award.create({
    data: {
      userId:      user.id,
      name:        "TheGardens — 3rd Place Desjardins-Sponsor Challenge",
      event:       "ConuHacks X",
      date:        new Date("2026-01-01"),
      description: "Third place in the Desjardins Sponsor Challenge at ConuHacks X in Montreal, Quebec.",
    },
  });

  console.log("Seed completed for user:", user.name);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
