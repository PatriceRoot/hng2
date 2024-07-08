import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import organisationRoutes from './routes/organisation.route.js';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', organisationRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Start the server and log the port it's running on
});