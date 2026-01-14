import { Router } from "express";
import { AuthController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    router.post("/login", controller.loginUser);
    router.get("/me", [AuthMiddleware.validateJWT], controller.getProfile);

    return router;
  }
}
