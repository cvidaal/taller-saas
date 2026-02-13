import { Router } from "express";
import { UserRoutes } from "./presentation/user/routes";
import { ClientRoutes } from "./presentation/client/routes";
import { VehicleRoutes } from "./presentation/vehicle/routes";
import { JobRoutes } from "./presentation/job/routes";
import { AuthRoutes } from "./presentation/auth/routes";
import { AuthMiddleware } from "./presentation/middlewares/auth.middleware";
import { DashboardRoutes } from "./presentation/dashboard/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Zona pública (no token)
    router.use("/auth", AuthRoutes.routes);

    // MIDDLEWARE
    router.use(AuthMiddleware.validateJWT);

    // rutas
    router.use("/users", UserRoutes.routes);
    router.use("/clients", ClientRoutes.routes);
    router.use("/vehicles", VehicleRoutes.routes);
    router.use("/jobs", JobRoutes.routes);
    router.use("/dashboard/", DashboardRoutes.routes);

    return router;
  }
}
