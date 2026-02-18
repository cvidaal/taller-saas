"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcryptjs_1 = require("bcryptjs");
class BcryptAdapter {
    // Encriptar
    static hash = async (password) => {
        return await (0, bcryptjs_1.hash)(password, 10);
    };
    // Comparar para el login
    static compare = async (password, hashed) => {
        return await (0, bcryptjs_1.compare)(password, hashed);
    };
}
exports.BcryptAdapter = BcryptAdapter;
//# sourceMappingURL=bcrypt.adapter.js.map