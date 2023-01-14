import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
/*
const a = await prisma.category.create({
    data: {
        description: "sa",
        name: "asa",
        id: "as",
    },
    select: { id: true },
});
*/
