import { db } from "@/lib/db";
import type { ExperienceCreateInput, ExperienceUpdateInput } from "../../generated/prisma/models";

export const ExperienceRepository = {
  findAll: (userId: number) =>
    db.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      include: { skills: true },
    }),

  findById: (id: number) =>
    db.experience.findUnique({ where: { id }, include: { skills: true } }),

  create: (data: Omit<ExperienceCreateInput, "id">) =>
    db.experience.create({ data }),

  update: (id: number, data: ExperienceUpdateInput) =>
    db.experience.update({ where: { id }, data }),

  addSkill: (id: number, skillId: number) =>
    db.experience.update({
      where: { id },
      data: { skills: { connect: { id: skillId } } },
    }),

  removeSkill: (id: number, skillId: number) =>
    db.experience.update({
      where: { id },
      data: { skills: { disconnect: { id: skillId } } },
    }),

  delete: (id: number) =>
    db.experience.delete({ where: { id } }),
};
