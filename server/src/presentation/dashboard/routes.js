"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class DashboardRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        router.get("/stats", controller_1.getDashboardStats);
        return router;
    }
}
exports.DashboardRoutes = DashboardRoutes;
//# sourceMappingURL=routes.js.map