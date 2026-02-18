"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_adapter_1 = require("../../config/jwt.adapter");
const postgres_1 = require("../../data/postgres");
class AuthMiddleware {
    static async validateJWT(req, res, next) {
        // 1. Buscamos en el header "Authorization"
        const authorization = req.header("Authorization");
        if (!authorization)
            return res.status(401).json({ error: "No token provided" });
        if (!authorization.startsWith("Bearer "))
            return res.status(401).json({ error: "Invalid Bearer token" });
        //2 Extraemos el token sin la palabra "Bearer"
        const token = authorization.split(" ")[1] || "";
        try {
            const payload = await jwt_adapter_1.JwtAdapter.validateToken(token);
            if (!payload)
                return res.status(401).json({ error: "Invalid Token" });
            // Probar que el usuario aún exista
            const user = await postgres_1.prisma.user.findUnique({ where: { id: payload.id } });
            if (!user)
                return res
                    .status(401)
                    .json({ error: "Invalid token - user not found" });
            if (!req.body)
                req.body = {};
            req.body.user = user; // Permite saber el usuario que esta logueado
            // Luz verde!
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server error" });
        }
    }
    static restricTo = (...allowedRoles) => {
        return (req, res, next) => {
            // Obtengo el usuario (AuthMiddleware.validateJWT)
            const { user } = req.body;
            if (!user) {
                return res.status(500).json({ error: "User not found in request" });
            }
            // 2. Verificamos si el rol esta en la lista permitida
            if (!allowedRoles.includes(user.role)) {
                return res
                    .status(403)
                    .json({ error: "Access denied. You do not have permission." });
            }
            next();
        };
    };
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map