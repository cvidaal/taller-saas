import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { handleHttpError } from "../../utils/handle-error";

export class ClientController {
  constructor() {}

  public createClient = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, phone } = req.body;

      const newClient = await prisma.client.create({
        data: { firstName, lastName, email, phone },
      });
      res.json(newClient);
    } catch (error) {
      res.status(500).json({ error: "Error creating Client" });
    }
  };

  public getClients = async (req: Request, res: Response) => {
    try {
      const clients = await prisma.client.findMany();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: "Error get Clients" });
    }
  };

  public updateClient = async (req: Request, res: Response) => {
    const { id } = req.params; // Saco el id del url
    const { firstName, lastName, phone, email } = req.body; // Sacamos los datos nuevos.

    if (!firstName && !lastName && !phone && !email) {
      return res.status(400).json({
        error:
          "At least one property (fistName, lastName, phone, email) is required to update",
      });
    }

    try {
      const updatedClient = await prisma.client.update({
        where: {
          id: id!,
        },
        data: {
          firstName,
          lastName,
          phone,
          email,
        },
      });

      res.json(updatedClient);
    } catch (error) {
      handleHttpError(res, error);
    }
  };

  public deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedClient = await prisma.client.delete({
        where: {
          id: id!,
        },
      });

      res.json(deletedClient);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
}
