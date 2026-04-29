import { db } from "@/lib/db";
import type { SkillCreateInput, SkillUpdateInput } from "../../generated/prisma/models";

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

  create: (data: Omit<SkillCreateInput, "id">) =>
    db.skill.create({ data }),

  update: (id: number, data: SkillUpdateInput) =>
    db.skill.update({ where: { id }, data }),

  delete: (id: number) =>
    db.skill.delete({ where: { id } }),
};
