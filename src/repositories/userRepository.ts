import { db } from "@/lib/db";

export const UserRepository = {
  findFirst: () =>
    db.user.findFirst({
      include: {
        contacts: true,
        cvs: true,
        skills: true,
        experiences: { orderBy: { startDate: "desc" }, include: { skills: true } },
        projects: { orderBy: { order: "asc" }, include: { skills: true } },
        awards: { orderBy: { date: "desc" } },
        educations: { orderBy: { startDate: "desc" } },
      },
    }),

  findById: (id: number) =>
    db.user.findUnique({ where: { id } }),

  create: (data: { name: string; location: string; jobTitle: string; description: string }) =>
    db.user.create({ data }),

  update: (id: number, data: Partial<{ name: string; location: string; jobTitle: string; description: string }>) =>
    db.user.update({ where: { id }, data }),
};
