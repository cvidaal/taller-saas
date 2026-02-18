"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const postgres_1 = require("../../data/postgres");
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const handle_error_1 = require("../../utils/handle-error");
class UserController {
    constructor() { }
    createUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt_adapter_1.BcryptAdapter.hash(password);
            const newUser = await postgres_1.prisma.user.create({
                data: { name, email, password: hashedPassword, role: "MECHANIC" },
            });
            const { password: _, ...user } = newUser;
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: "Error creating user" });
        }
    };
    getUsers = async (req, res) => {
        const users = await postgres_1.prisma.user.findMany();
        res.json(users);
    };
    updateUser = async (req, res) => {
        const { id } = req.params; // Saco el id del url
        const { name, email } = req.body; // Sacamos los datos nuevos.
        if (!name && !email) {
            return res.status(400).json({
                error: "At least one property (name or email) is required to update",
            });
        }
        try {
            const updatedUser = await postgres_1.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                    email,
                },
            });
            res.json(updatedUser);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
    deleteUser = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUser = await postgres_1.prisma.user.delete({
                where: {
                    id: id,
                },
            });
            res.json(deletedUser);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
}
exports.UserController = UserController;
//# sourceMappingURL=controller.js.map