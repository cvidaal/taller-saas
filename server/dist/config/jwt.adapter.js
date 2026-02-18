"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("./envs");
class JwtAdapter {
    //1. Generar Token
    static async generateToken(payload, duration = "2h") {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.sign(payload, envs_1.envs.JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err)
                    return resolve(null);
                resolve(token);
            });
        });
    }
    //2. Validar Token
    // T. Es un tipo genérico en el que recibimos una caja en la función de usarlo pondremos algo como
    // {id: string, email: string}
    static async validateToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, envs_1.envs.JWT_SEED, (err, decoded) => {
                if (err)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
}
exports.JwtAdapter = JwtAdapter;
//# sourceMappingURL=jwt.adapter.js.map