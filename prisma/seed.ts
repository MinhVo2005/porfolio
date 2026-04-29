import { PrismaClient } from "../generated/prisma/client";
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
    data: { userId: user.id, lang: "en", url: "/MASTER_CV.docx" },
  });

  // Education
  await db.education.create({
    data: {
      userId: user.id,
      school:          "McGill University",
      degree:          "Bachelor of Software Engineering, Co-op",
      major:           "Software Engineering",
      gpa:             3.95,
      startDate:       new Date("2024-09-01"),
      graduationDate:  new Date("2028-04-30"),
    },
  });

  // Skills
  const skillData = [
    // Languages
    { name: "Python",       category: "Languages" },
    { name: "TypeScript",   category: "Languages" },
    { name: "JavaScript",   category: "Languages" },
    { name: "Java",         category: "Languages" },
    { name: "C",            category: "Languages" },
    { name: "C++",          category: "Languages" },
    { name: "Bash",         category: "Languages" },
    { name: "HTML",         category: "Languages" },
    { name: "CSS",          category: "Languages" },
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
      description: "Maintained and scaled a production website serving 1,000+ daily users across McGill's ECSE student community. Planned and designed pages using Svelte and TailwindCSS, improving visual presentation and responsiveness. Developed automated internal tools to handle bug reports and content management. Collaborated with the team using Git/GitHub, conducting code reviews and participating in pull request workflows.",
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
      description: "Worked in a fast-paced environment, maintaining speed, preparation, and organization during peak service hours.",
      startDate:   new Date("2025-01-01"),
      order:       1,
      skills:      { connect: [] },
    },
  });

  // Projects
  await db.project.create({
    data: {
      userId:      user.id,
      name:        "Home Server",
      category:    "Infrastructure",
      status:      "BUILDING",
      featured:    true,
      order:       0,
      description: "Orchestrated a self-hosted Kubernetes (K3S) cluster on Debian to deploy and manage containerized applications across multiple services. Configured remote access via SSH and exposed services securely using Traefik as a reverse proxy with Cloudflare Tunnels. Containerized and deployed personal projects including Discord bots and home automation apps using Docker.",
      skills:      { connect: [skill("Docker"), skill("Kubernetes"), skill("Linux"), skill("Bash"), skill("Traefik")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "TheGardens",
      category:    "Embedded",
      status:      "ARCHIVED",
      featured:    true,
      order:       1,
      description: "Designed an IoT gesture-control glove using ESP-32 microcontroller integrating with MPU-9250 to track hand movement and cursor control via BLE. Programmed embedded firmware in C++, applying filter and gesture tracking algorithms. Developed a full-stack banking application in Flutter with a Python backend as a sponsor challenge. Won 3rd place Desjardins-Sponsor Challenge at ConuHacks X.",
      skills:      { connect: [skill("ESP-32"), skill("C++"), skill("Flutter"), skill("Python")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "Full Stack Messaging App",
      category:    "Web",
      status:      "DEPLOYING",
      featured:    true,
      order:       2,
      description: "Handled authorization using bcryptJS password hashing, JWT session tokens, and SMTP for email verification. Developed a REST API with dynamic Express routing and integrated Pusher for real-time messaging. Built with ReactJS and TypeScript, deployed on Render (backend) and Vercel (frontend). Designed a MongoDB document schema to persist user profiles, messages, and images.",
      skills:      { connect: [skill("ReactJS"), skill("TypeScript"), skill("NodeJS")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "DPM Delivery Robot",
      category:    "Robotics",
      status:      "ARCHIVED",
      featured:    false,
      order:       3,
      description: "Designed an autonomous navigation system for Lego-based delivery robots using BrickPi 3, integrating ultrasonic and color sensors for obstacle detection and path planning. Implemented a multi-threaded Python control system on Raspberry Pi OS to manage concurrent sensor data processing and motor control. Developed a test suite to validate robot navigation, color detection, and delivery functionalities.",
      skills:      { connect: [skill("Python"), skill("BrickPi 3"), skill("Raspberry Pi"), skill("Git"), skill("Linux")] },
    },
  });

  await db.project.create({
    data: {
      userId:      user.id,
      name:        "Discord Music Bot",
      category:    "Bots",
      status:      "DEPLOYING",
      featured:    false,
      order:       4,
      description: "Developed a fully functional music bot that can search, play, pause, and skip songs in the queue. Built with JavaScript, discord.js, and NPM libraries for song search and playback.",
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
