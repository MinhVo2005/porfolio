import { db } from "@/lib/db";

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

  create: (data: {
    userId: number;
    name: string;
    description: string;
    url?: string;
    githubUrl?: string;
    imageUrl?: string;
    featured?: boolean;
    order?: number; //Priority, 0 is lowest
  }) => db.project.create({ data }),

  update: (id: number, data: Parameters<typeof db.project.update>[0]["data"]) =>
    db.project.update({ where: { id }, data }),

  delete: (id: number) =>
    db.project.delete({ where: { id } }),
};
