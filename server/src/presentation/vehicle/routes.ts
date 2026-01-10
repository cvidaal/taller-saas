import { Router } from "express";
import { VehicleController } from "./controller";

export class VehicleRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new VehicleController();

    router.get("/", controller.getVehicles);
    router.post("/", controller.createVehicle);
    router.put("/:id", controller.updateVehicle);
    router.delete("/:id", controller.deleteVehicle);

    return router;
  }
}
