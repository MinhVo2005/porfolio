import { db } from "@/lib/db";
import type { ContactUncheckedCreateInput, ContactUncheckedUpdateInput } from "../../generated/prisma/models";
import type { ContactType } from "../../generated/prisma/enums";

export const ContactRepository = {
  findAll: (userId: number) =>
    db.contact.findMany({ where: { userId } }),

  findByType: (userId: number, type: ContactType) =>
    db.contact.findFirst({ where: { userId, type } }),

  create: (data: Omit<ContactUncheckedCreateInput, "id">) =>
    db.contact.create({ data }),

  update: (id: number, data: ContactUncheckedUpdateInput) =>
    db.contact.update({ where: { id }, data }),

  delete: (id: number) =>
    db.contact.delete({ where: { id } }),
};
