"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./presentation/user/routes");
const routes_2 = require("./presentation/client/routes");
const routes_3 = require("./presentation/vehicle/routes");
const routes_4 = require("./presentation/job/routes");
const routes_5 = require("./presentation/auth/routes");
const auth_middleware_1 = require("./presentation/middlewares/auth.middleware");
const routes_6 = require("./presentation/dashboard/routes");
const routes_7 = require("./presentation/search/routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Zona pública (no token)
        router.use("/auth", routes_5.AuthRoutes.routes);
        // MIDDLEWARE
        router.use(auth_middleware_1.AuthMiddleware.validateJWT);
        // rutas
        router.use("/users", routes_1.UserRoutes.routes);
        router.use("/clients", routes_2.ClientRoutes.routes);
        router.use("/vehicles", routes_3.VehicleRoutes.routes);
        router.use("/jobs", routes_4.JobRoutes.routes);
        router.use("/dashboard/", routes_6.DashboardRoutes.routes);
        router.use("/search", routes_7.SearchRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=routes.js.map