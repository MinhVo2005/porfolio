import { db } from "@/lib/db";

export const CvRepository = {
  findAll: (userId: number) =>
    db.cV.findMany({ where: { userId } }),

  findByLang: (lang: string) =>
    db.cV.findUnique({ where: { lang } }),

  findById: (id: number) =>
    db.cV.findUnique({ where: { id } }),

  create: (data: { userId: number; lang: string; url: string }) =>
    db.cV.create({ data }),

  update: (id: number, data: Parameters<typeof db.cV.update>[0]["data"]) =>
    db.cV.update({ where: { id }, data }),

  delete: (id: number) =>
    db.cV.delete({ where: { id } }),
};
