"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class ClientRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.ClientController();
        router.get("/", controller.getClients);
        router.post("/", controller.createClient);
        router.put("/:id", controller.updateClient);
        router.delete("/:id", controller.deleteClient);
        return router;
    }
}
exports.ClientRoutes = ClientRoutes;
//# sourceMappingURL=routes.js.map