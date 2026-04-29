import { db } from "@/lib/db";
import type { EducationCreateInput, EducationUpdateInput } from "../../generated/prisma/models";

export const EducationRepository = {
  findAll: (userId: number) =>
    db.education.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    }),

  findById: (id: number) =>
    db.education.findUnique({ where: { id } }),

  create: (data: Omit<EducationCreateInput, "id">) =>
    db.education.create({ data }),

  update: (id: number, data: EducationUpdateInput) =>
    db.education.update({ where: { id }, data }),

  delete: (id: number) =>
    db.education.delete({ where: { id } }),
};
