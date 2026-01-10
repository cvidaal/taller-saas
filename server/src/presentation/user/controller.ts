import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { handleHttpError } from "../../utils/handle-error";

export class UserController {
  constructor() {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await BcryptAdapter.hash(password);

      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword, role: "MECHANIC" },
      });

      const { password: _, ...user } = newUser;

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  };

  public updateUser = async (req: Request, res: Response) => {
    const { id } = req.params; // Saco el id del url
    const { name, email } = req.body; // Sacamos los datos nuevos.

    if (!name && !email) {
      return res.status(400).json({
        error: "At least one property (name or email) is required to update",
      });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id!,
        },
        data: {
          name,
          email,
        },
      });

      res.json(updatedUser);
    } catch (error) {
      handleHttpError(res, error);
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: id!,
        },
      });

      res.json(deletedUser);
    } catch (error) {
      handleHttpError(res, error);
    }
  };
}
