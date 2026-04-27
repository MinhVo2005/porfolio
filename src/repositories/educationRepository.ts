import { db } from "@/lib/db";
import type { EducationUncheckedCreateInput, EducationUncheckedUpdateInput } from "../../generated/prisma/models";

export const EducationRepository = {
  findAll: (userId: number) =>
    db.education.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    }),

  findById: (id: number) =>
    db.education.findUnique({ where: { id } }),

  create: (data: Omit<EducationUncheckedCreateInput, "id">) =>
    db.education.create({ data }),

  update: (id: number, data: EducationUncheckedUpdateInput) =>
    db.education.update({ where: { id }, data }),

  delete: (id: number) =>
    db.education.delete({ where: { id } }),
};
