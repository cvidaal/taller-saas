import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { envs } from "./config/envs";
import { AppRoutes } from "./routes";

const app = express();
const port = envs.PORT;

const prisma = new PrismaClient();

// Middlewares
app.use(cors()); // Permite que el frontend (React) hable con el Backend
app.use(express.json()); // Permite a tu servidor leer JSON
app.use(express.urlencoded({ extended: true }));

// Rutas globales
app.use("/api/v1", AppRoutes.routes);

export { app };
