import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { BcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthController {
  constructor() {}

  public loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      // Buscar el usuario
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      // Si usuario es null error 400
      if (!user) {
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }

      // Comparar contraseña
      const isMatching = await BcryptAdapter.compare(password, user.password);

      if (!isMatching) {
        return res.status(400).json({ error: "Credenciales incorrectas" });
      }

      // Para generar el token usamos datos seguros.
      const token = await JwtAdapter.generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        user: userWithoutPassword,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ error: "Error login user" });
    }
  };

  public getProfile = (req: Request, res: Response) => {
    const { user } = req.body;

    return res.json({
      user,
    });
  };
}
