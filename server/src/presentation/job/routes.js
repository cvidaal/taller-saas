"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class JobRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.JobController();
        router.get("/", controller.getJobs);
        router.post("/", controller.createJob);
        router.put("/:id", controller.updateJob);
        router.delete("/:id", controller.deleteJob);
        return router;
    }
}
exports.JobRoutes = JobRoutes;
//# sourceMappingURL=routes.js.map