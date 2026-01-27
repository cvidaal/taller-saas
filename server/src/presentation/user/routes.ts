import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new UserController();

    // rutas
    router.get("/", controller.getUsers);
    router.post("/", controller.createUser);
    router.put("/:id", controller.updateUser);
    router.delete(
      "/:id",
      [AuthMiddleware.restricTo("ADMIN")],
      controller.deleteUser,
    );

    return router;
  }
}
