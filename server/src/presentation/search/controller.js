"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const postgres_1 = require("../../data/postgres");
class SearchController {
    constructor() { }
    search = async (req, res) => {
        try {
            let { query } = req.query;
            // Express puede devolver query como string o string[]; normalizamos a string
            const searchQuery = Array.isArray(query) ? query[0] : query; // Si query es un array, tomamos el primer elemento
            if (!searchQuery || String(searchQuery).trim() === "") {
                return res.status(400).json({ error: "Query es requerido" });
            }
            const q = String(searchQuery).trim(); // Normalizamos el query a string
            const clients = await postgres_1.prisma.client.findMany({
                where: {
                    OR: [
                        { firstName: { contains: q, mode: "insensitive" } },
                        { lastName: { contains: q, mode: "insensitive" } },
                        { email: { contains: q, mode: "insensitive" } },
                        { phone: { contains: q, mode: "insensitive" } },
                    ],
                },
            });
            const vehicles = await postgres_1.prisma.vehicle.findMany({
                where: {
                    OR: [
                        { brand: { contains: q, mode: "insensitive" } },
                        { model: { contains: q, mode: "insensitive" } },
                        {
                            licensePlate: { contains: q, mode: "insensitive" },
                        },
                        ...(Number.isNaN(Number(q))
                            ? []
                            : [{ year: { equals: Number(q) } }]),
                    ],
                },
            });
            const jobs = await postgres_1.prisma.job.findMany({
                where: {
                    OR: [
                        { description: { contains: q, mode: "insensitive" } },
                        {
                            vehicle: {
                                licensePlate: {
                                    contains: q,
                                    mode: "insensitive",
                                },
                            },
                        },
                    ],
                },
                include: {
                    vehicle: true,
                    mechanic: true,
                },
            });
            return res.json({ clients, vehicles, jobs });
        }
        catch (error) {
            return res.status(500).json({ error: "Error al buscar" });
        }
    };
}
exports.SearchController = SearchController;
//# sourceMappingURL=controller.js.map