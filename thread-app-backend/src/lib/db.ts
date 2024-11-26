import {PrismaClient} from '@prisma/client'
export const prismaClient = new PrismaClient();
(async () => {
    try {
      await prismaClient.$connect();
      console.log("Connected to the database successfully.");
    } catch (error) {
      console.error("Error connecting to the database: ", error);
    }
  })();