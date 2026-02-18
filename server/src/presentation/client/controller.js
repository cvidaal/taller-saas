"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const postgres_1 = require("../../data/postgres");
const handle_error_1 = require("../../utils/handle-error");
class ClientController {
    constructor() { }
    createClient = async (req, res) => {
        try {
            const { firstName, lastName, email, phone } = req.body;
            const newClient = await postgres_1.prisma.client.create({
                data: { firstName, lastName, email, phone },
            });
            res.json(newClient);
        }
        catch (error) {
            res.status(500).json({ error: "Error creating Client" });
        }
    };
    getClients = async (req, res) => {
        try {
            const clients = await postgres_1.prisma.client.findMany();
            res.json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Error get Clients" });
        }
    };
    updateClient = async (req, res) => {
        const { id } = req.params; // Saco el id del url
        const { firstName, lastName, phone, email } = req.body; // Sacamos los datos nuevos.
        if (!firstName && !lastName && !phone && !email) {
            return res.status(400).json({
                error: "At least one property (fistName, lastName, phone, email) is required to update",
            });
        }
        try {
            const updatedClient = await postgres_1.prisma.client.update({
                where: {
                    id: id,
                },
                data: {
                    firstName,
                    lastName,
                    phone,
                    email,
                },
            });
            res.json(updatedClient);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
    deleteClient = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedClient = await postgres_1.prisma.client.delete({
                where: {
                    id: id,
                },
            });
            res.json(deletedClient);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
}
exports.ClientController = ClientController;
//# sourceMappingURL=controller.js.map