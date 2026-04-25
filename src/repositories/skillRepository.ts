import { db } from "@/lib/db";

export const SkillRepository = {
  findAll: (userId: number) =>
    db.skill.findMany({
      where: { userId },
      orderBy: { category: "asc" },
    }),

  findByCategory: (userId: number, category: string) =>
    db.skill.findMany({ where: { userId, category } }),

  findById: (id: number) =>
    db.skill.findUnique({ where: { id } }),

  create: (data: {
    userId: number;
    name: string;
    category: string;
    description?: string;
  }) => db.skill.create({ data }),

  update: (id: number, data: Parameters<typeof db.skill.update>[0]["data"]) =>
    db.skill.update({ where: { id }, data }),

  delete: (id: number) =>
    db.skill.delete({ where: { id } }),
};
