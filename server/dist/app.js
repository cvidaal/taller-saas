"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const envs_1 = require("./config/envs");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
exports.app = app;
const port = envs_1.envs.PORT;
const prisma = new client_1.PrismaClient();
// Middlewares
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
})); // Permite que el frontend (React) hable con el Backend
app.use(express_1.default.json()); // Permite a tu servidor leer JSON
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas globales
app.use("/api/v1", routes_1.AppRoutes.routes);
//# sourceMappingURL=app.js.map