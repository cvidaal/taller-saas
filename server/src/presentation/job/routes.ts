import { Router } from "express";
import { JobController } from "./controller";

export class JobRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new JobController();

    router.get("/", controller.getJobs);
    router.post("/", controller.createJob);
    router.put("/:id", controller.updateJob);
    router.delete("/:id", controller.deleteJob);

    return router;
  }
}
