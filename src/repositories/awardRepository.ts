import { db } from "@/lib/db";
import type { AwardCreateInput, AwardUpdateInput } from "../../generated/prisma/models";

export const AwardRepository = {
  findAll: (userId: number) =>
    db.award.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    }),

  findById: (id: number) =>
    db.award.findUnique({ where: { id } }),

  create: (data: Omit<AwardCreateInput, "id">) =>
    db.award.create({ data }),

  update: (id: number, data: AwardUpdateInput) =>
    db.award.update({ where: { id }, data }),

  delete: (id: number) =>
    db.award.delete({ where: { id } }),
};
