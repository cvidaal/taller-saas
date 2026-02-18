"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const postgres_1 = require("../../data/postgres");
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../config/jwt.adapter");
class AuthController {
    constructor() { }
    loginUser = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Buscar el usuario
            const user = await postgres_1.prisma.user.findFirst({
                where: {
                    email: email,
                },
            });
            // Si usuario es null error 400
            if (!user) {
                return res.status(400).json({ error: "Credenciales incorrectas" });
            }
            // Comparar contraseña
            const isMatching = await bcrypt_adapter_1.BcryptAdapter.compare(password, user.password);
            if (!isMatching) {
                return res.status(400).json({ error: "Credenciales incorrectas" });
            }
            // Para generar el token usamos datos seguros.
            const token = await jwt_adapter_1.JwtAdapter.generateToken({
                id: user.id,
                email: user.email,
                role: user.role,
            });
            const { password: _, ...userWithoutPassword } = user;
            return res.status(200).json({
                user: userWithoutPassword,
                token: token,
            });
        }
        catch (error) {
            res.status(500).json({ error: "Error login user" });
        }
    };
    getProfile = (req, res) => {
        const { user } = req.body;
        return res.json({
            user,
        });
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=controller.js.map