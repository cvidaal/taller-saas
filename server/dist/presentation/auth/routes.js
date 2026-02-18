"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.AuthController();
        router.post("/login", controller.loginUser);
        router.get("/me", [auth_middleware_1.AuthMiddleware.validateJWT], controller.getProfile);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=routes.js.map