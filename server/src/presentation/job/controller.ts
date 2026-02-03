import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { handleHttpError } from "../../utils/handle-error";
import { JobStatus } from "@prisma/client";

export class JobController {
  constructor() {}

  public createJob = async (req: Request, res: Response) => {
    try {
      const { vehicleId, assignedMechanicId, description, cost } = req.body;
      if (!vehicleId)
        return res.status(400).json({ error: "Vehicle is required" });
      if (!assignedMechanicId)
        return res.status(400).json({ error: "Mechanic is required" });
      if (!description)
        return res.status(400).json({ error: "Description is required" });
      if (cost === undefined)
        return res.status(400).json({ error: "Cost is required" });

      const newJob = await prisma.job.create({
        data: {
          vehicleId,
          assignedMechanicId,
          description,
          cost: Number(cost),
        },
      });
      res.json(newJob);
    } catch (error) {
      res.status(500).json({ error: "Error creating job, Review ids" });
    }
  };

  public getJobs = async (req: Request, res: Response) => {
    const jobs = await prisma.job.findMany({
      include: {
        mechanic: {
          select: { name: true, email: true }, // Solo traemos nombre y email de user
        },
        vehicle: {
          include: {
            client: true,
          },
        },
      },
    });

    res.json(jobs);
  };

  public updateJob = async (req: Request, res: Response) => {
    const { id } = req.params; // Saco el id del url
    const { description, status, cost, vehicleId, assignedMechanicId } =
      req.body; // Sacamos los datos nuevos.

    if (!description && !status && !cost && !vehicleId && !assignedMechanicId) {
      return res.status(400).json({
        error:
          "At least one property (description, status, cost, vehicleId, assignedMechanicId) is required to update",
      });
    }

    try {
      const data: any = {
        description: description!,
        status: status as JobStatus,
        cost: cost ? Number(cost) : undefined,
        vehicleId,
        assignedMechanicId,
      };

      if (status) {
        if (status === "COMPLETED") {
          data.closedAt = new Date();
        } else {
          data.closedAt = null;
        }
      }

      const updatedJob = await prisma.job.update({
        where: {
          id: id!,
        },
        data: data,
      });

      res.json(updatedJob);
    } catch (error) {
      handleHttpError(res, error);
    }
  };

  public deleteJob = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedJob = await prisma.job.delete({
        where: {
          id: id!,
        },
      });

      res.json(deletedJob);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
}
