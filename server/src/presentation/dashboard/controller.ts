import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [clientCount, vehicleCount, jobsCount, revenueData] =
      await Promise.all([
        prisma.client.count(),
        prisma.vehicle.count(),
        prisma.job.count(),
        // Dinero total ganado
        prisma.job.aggregate({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error cargando estadísticas" });
  }
};
