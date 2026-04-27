import { db } from "@/lib/db";
import type { CVUncheckedCreateInput, CVUncheckedUpdateInput } from "../../generated/prisma/models";

export const CvRepository = {
  findAll: (userId: number) =>
    db.cV.findMany({ where: { userId } }),

  findByLang: (lang: string) =>
    db.cV.findUnique({ where: { lang } }),

  findById: (id: number) =>
    db.cV.findUnique({ where: { id } }),

  create: (data: Omit<CVUncheckedCreateInput, "id">) =>
    db.cV.create({ data }),

  update: (id: number, data: CVUncheckedUpdateInput) =>
    db.cV.update({ where: { id }, data }),

  delete: (id: number) =>
    db.cV.delete({ where: { id } }),
};
