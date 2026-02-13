import { Router } from "express";
import { getDashboardStats } from "./controller";

export class DashboardRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/stats", getDashboardStats);

    return router;
  }
}
