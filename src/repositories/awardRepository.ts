import { db } from "@/lib/db";

export const AwardRepository = {
  findAll: (userId: number) =>
    db.award.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    }),

  findById: (id: number) =>
    db.award.findUnique({ where: { id } }),

  create: (data: {
    userId: number;
    name: string;
    date: Date;
    event: string;
    description: string;
  }) => db.award.create({ data }),

  update: (id: number, data: Parameters<typeof db.award.update>[0]["data"]) =>
    db.award.update({ where: { id }, data }),

  delete: (id: number) =>
    db.award.delete({ where: { id } }),
};
