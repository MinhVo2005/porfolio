import { db } from "@/lib/db";
import type { CVCreateInput, CVUpdateInput } from "../../generated/prisma/models";

export const CvRepository = {
  findAll: (userId: number) =>
    db.cV.findMany({ where: { userId } }),

  findByLang: (lang: string) =>
    db.cV.findUnique({ where: { lang } }),

  findById: (id: number) =>
    db.cV.findUnique({ where: { id } }),

  create: (data: Omit<CVCreateInput, "id">) =>
    db.cV.create({ data }),

  update: (id: number, data: CVUpdateInput) =>
    db.cV.update({ where: { id }, data }),

  delete: (id: number) =>
    db.cV.delete({ where: { id } }),
};
