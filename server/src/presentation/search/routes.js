"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class SearchRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const controller = new controller_1.SearchController();
        router.get("/", controller.search);
        return router;
    }
}
exports.SearchRoutes = SearchRoutes;
//# sourceMappingURL=routes.js.map