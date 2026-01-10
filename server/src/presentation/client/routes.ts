import { Router } from "express";
import { ClientController } from "./controller";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new ClientController();

    router.get("/", controller.getClients);
    router.post("/", controller.createClient);
    router.put("/:id", controller.updateClient);
    router.delete("/:id", controller.deleteClient);

    return router;
  }
}
