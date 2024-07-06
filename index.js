import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import organisationRoutes from './routes/organisation.route.js';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', organisationRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});