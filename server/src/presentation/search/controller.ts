import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class SearchController {
  constructor() {}

  public search = async (req: Request, res: Response) => {
    try {
      let { query } = req.query;
      // Express puede devolver query como string o string[]; normalizamos a string
      const searchQuery = Array.isArray(query) ? query[0] : query; // Si query es un array, tomamos el primer elemento
      if (!searchQuery || String(searchQuery).trim() === "") {
        return res.status(400).json({ error: "Query es requerido" });
      }
      const q = String(searchQuery).trim(); // Normalizamos el query a string

      const clients = await prisma.client.findMany({
        where: {
          OR: [
            { firstName: { contains: q, mode: "insensitive" } },
            { lastName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { phone: { contains: q, mode: "insensitive" } },
          ],
        },
      });

      const vehicles = await prisma.vehicle.findMany({
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

      const jobs = await prisma.job.findMany({
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
    } catch (error) {
      return res.status(500).json({ error: "Error al buscar" });
    }
  };
}
