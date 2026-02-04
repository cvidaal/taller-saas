import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { handleHttpError } from "../../utils/handle-error";

export class VehicleController {
  constructor() {}

  public createVehicle = async (req: Request, res: Response) => {
    try {
      const { brand, model, year, licensePlate, clientId } = req.body;
      if (!brand) return res.status(400).json({ error: "Brand is not exist" });
      if (!model) return res.status(400).json({ error: "Model is not exist" });
      if (!year) return res.status(400).json({ error: "Year is not exist" });
      if (!licensePlate)
        return res.status(400).json({ error: "LicensePlate is not exist" });

      if (!clientId)
        return res.status(400).json({ error: "Falta seleccionar un cliente" });

      const newVehicle = await prisma.vehicle.create({
        data: {
          brand,
          model,
          year: Number(year),
          licensePlate,
          clientId, // Prisma comprueba si el id EXISTE EN LA TABLA CLIENT.
        },
      });

      res.json(newVehicle);
    } catch (error) {
      res.status(500).json({ error: "Error create vehicle. Client exist?" });
    }
  };

  public getVehicles = async (req: Request, res: Response) => {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        client: true,
        jobs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    res.json(vehicles);
  };

  public getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        id: id,
      },
      include: {
        client: true,
        jobs: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!vehicle) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    res.json(vehicle);
  };

  public updateVehicle = async (req: Request, res: Response) => {
    const { id } = req.params; // Saco el id del url
    const { clientId, brand, model, year, licensePlate } = req.body; // Sacamos los datos nuevos.

    if (!clientId && !brand && !model && !year && !licensePlate) {
      return res.status(400).json({
        error:
          "At least one property (clientId, brand, model, year, licensePlate) is required to update",
      });
    }

    try {
      const updatedVehicle = await prisma.vehicle.update({
        where: {
          id: id!,
        },
        data: {
          clientId,
          brand,
          model,
          year,
          licensePlate,
        },
      });

      res.json(updatedVehicle);
    } catch (error) {
      handleHttpError(res, error);
    }
  };

  public deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteVehicle = await prisma.vehicle.delete({
        where: {
          id: id!,
        },
      });

      res.json(deleteVehicle);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
}
