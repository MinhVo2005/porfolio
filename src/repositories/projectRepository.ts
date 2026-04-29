import { db } from "@/lib/db";
import type { ProjectCreateInput, ProjectUpdateInput } from "../../generated/prisma/models";

export const ProjectRepository = {
  findAll: (userId: number) =>
    db.project.findMany({
      where: { userId },
      orderBy: { order: "asc" },
      include: { skills: true },
    }),

  findFeatured: (userId: number) =>
    db.project.findMany({
      where: { userId, featured: true },
      orderBy: { order: "asc" },
      include: { skills: true },
    }),

  findById: (id: number) =>
    db.project.findUnique({ where: { id }, include: { skills: true } }),

  create: (data: Omit<ProjectCreateInput, "id">) =>
    db.project.create({ data }),

  update: (id: number, data: ProjectUpdateInput) =>
    db.project.update({ where: { id }, data }),

  delete: (id: number) =>
    db.project.delete({ where: { id } }),
};
