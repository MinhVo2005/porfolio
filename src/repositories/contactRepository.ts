import { db } from "@/lib/db";
import { ContactType } from "../../generated/prisma/enums";

export const ContactRepository = {
  findAll: (userId: number) =>
    db.contact.findMany({ where: { userId } }),

  findByType: (userId: number, type: ContactType) =>
    db.contact.findFirst({ where: { userId, type } }),

  create: (data: { userId: number; type: ContactType; contactInfo: string }) =>
    db.contact.create({ data }),

  update: (id: number, data: Parameters<typeof db.contact.update>[0]["data"]) =>
    db.contact.update({ where: { id }, data }),

  delete: (id: number) =>
    db.contact.delete({ where: { id } }),
};
