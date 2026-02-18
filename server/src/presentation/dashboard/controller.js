"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const postgres_1 = require("../../data/postgres");
const getDashboardStats = async (req, res) => {
    try {
        const [clientCount, vehicleCount, jobsCount, revenueData] = await Promise.all([
            postgres_1.prisma.client.count(),
            postgres_1.prisma.vehicle.count(),
            postgres_1.prisma.job.count(),
            // Dinero total ganado
            postgres_1.prisma.job.aggregate({
                _sum: { cost: true },
                where: { status: "COMPLETED" },
            }),
        ]);
        res.json({
            clients: clientCount,
            vehicles: vehicleCount,
            jobs: jobsCount,
            revenue: Number(revenueData._sum.cost) || 0, // Si no hay dinero, devolvemos 0
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error cargando estadísticas" });
    }
};
exports.getDashboardStats = getDashboardStats;
//# sourceMappingURL=controller.js.map