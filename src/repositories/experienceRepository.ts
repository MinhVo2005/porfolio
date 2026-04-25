import { db } from "@/lib/db";

export const ExperienceRepository = {
  findAll: (userId: number) =>
    db.experience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
      include: { skills: true },
    }),

  findById: (id: number) =>
    db.experience.findUnique({ where: { id }, include: { skills: true } }),

  create: (data: {
    userId: number;
    company: string;
    position: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    order?: number;
  }) => db.experience.create({ data }),

  update: (id: number, data: Parameters<typeof db.experience.update>[0]["data"]) =>
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
