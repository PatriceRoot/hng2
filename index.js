import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
