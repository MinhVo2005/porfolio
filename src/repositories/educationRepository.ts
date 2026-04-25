import { db } from "@/lib/db";

export const EducationRepository = {
  findAll: (userId: number) =>
    db.education.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    }),

  findById: (id: number) =>
    db.education.findUnique({ where: { id } }),

  create: (data: {
    userId: number;
    school: string;
    degree: string;
    major: string;
    minor?: string;
    startDate: Date;
    graduationDate?: Date;
  }) => db.education.create({ data }),

  update: (id: number, data: Parameters<typeof db.education.update>[0]["data"]) =>
    db.education.update({ where: { id }, data }),

  delete: (id: number) =>
    db.education.delete({ where: { id } }),
};
