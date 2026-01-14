import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { prisma } from "../../data/postgres";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    // 1. Buscamos en el header "Authorization"
    const authorization = req.header("Authorization");

    if (!authorization)
      return res.status(401).json({ error: "No token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    //2 Extraemos el token sin la palabra "Bearer"
    const token = authorization.split(" ")[1] || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      // Probar que el usuario aún exista
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user)
        return res
          .status(401)
          .json({ error: "Invalid token - user not found" });

      if (!req.body) req.body = {};
      req.body.user = user; // Permite saber el usuario que esta logueado

      // Luz verde!
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server error" });
    }
  }
}
