import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Organisation = prisma.organisation;

export default Organisation;
