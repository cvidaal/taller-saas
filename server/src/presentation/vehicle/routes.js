"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class VehicleRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.VehicleController();
        router.get("/", controller.getVehicles);
        router.post("/", controller.createVehicle);
        router.get("/:id", controller.getVehicleById);
        router.put("/:id", controller.updateVehicle);
        router.delete("/:id", controller.deleteVehicle);
        return router;
    }
}
exports.VehicleRoutes = VehicleRoutes;
//# sourceMappingURL=routes.js.map