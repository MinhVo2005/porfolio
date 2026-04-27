import { db } from "@/lib/db";
import type { UserCreateInput, UserUpdateManyMutationInput } from "../../generated/prisma/models";

export const UserRepository = {
  findFirst: () =>
    db.user.findFirst({
      include: {
        contacts: true,
        cvs: true,
        skills: true,
        experiences: { orderBy: { startDate: "desc" }, include: { skills: true } },
        projects: { orderBy: { order: "asc" }, include: { skills: true } },
        awards: { orderBy: { date: "desc" } },
        educations: { orderBy: { startDate: "desc" } },
      },
    }),

  findById: (id: number) =>
    db.user.findUnique({ where: { id } }),

  create: (data: UserCreateInput) =>
    db.user.create({ data }),

  update: (id: number, data: UserUpdateManyMutationInput) =>
    db.user.update({ where: { id }, data }),
};
