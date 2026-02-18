"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.UserController();
        // rutas
        router.get("/", controller.getUsers);
        router.post("/", controller.createUser);
        router.put("/:id", controller.updateUser);
        router.delete("/:id", [auth_middleware_1.AuthMiddleware.restricTo("ADMIN")], controller.deleteUser);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=routes.js.map