"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const postgres_1 = require("../../data/postgres");
const handle_error_1 = require("../../utils/handle-error");
class VehicleController {
    constructor() { }
    createVehicle = async (req, res) => {
        try {
            const { brand, model, year, licensePlate, clientId } = req.body;
            if (!brand)
                return res.status(400).json({ error: "Brand is not exist" });
            if (!model)
                return res.status(400).json({ error: "Model is not exist" });
            if (!year)
                return res.status(400).json({ error: "Year is not exist" });
            if (!licensePlate)
                return res.status(400).json({ error: "LicensePlate is not exist" });
            if (!clientId)
                return res.status(400).json({ error: "Falta seleccionar un cliente" });
            const newVehicle = await postgres_1.prisma.vehicle.create({
                data: {
                    brand,
                    model,
                    year: Number(year),
                    licensePlate,
                    clientId, // Prisma comprueba si el id EXISTE EN LA TABLA CLIENT.
                },
            });
            res.json(newVehicle);
        }
        catch (error) {
            res.status(500).json({ error: "Error create vehicle. Client exist?" });
        }
    };
    getVehicles = async (req, res) => {
        const vehicles = await postgres_1.prisma.vehicle.findMany({
            include: {
                client: true,
                jobs: {
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        res.json(vehicles);
    };
    getVehicleById = async (req, res) => {
        const { id } = req.params;
        const vehicle = await postgres_1.prisma.vehicle.findFirst({
            where: {
                id: id,
            },
            include: {
                client: true,
                jobs: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        if (!vehicle) {
            return res.status(404).json({ error: "Vehículo no encontrado" });
        }
        res.json(vehicle);
    };
    updateVehicle = async (req, res) => {
        const { id } = req.params; // Saco el id del url
        const { clientId, brand, model, year, licensePlate } = req.body; // Sacamos los datos nuevos.
        if (!clientId && !brand && !model && !year && !licensePlate) {
            return res.status(400).json({
                error: "At least one property (clientId, brand, model, year, licensePlate) is required to update",
            });
        }
        try {
            const updatedVehicle = await postgres_1.prisma.vehicle.update({
                where: {
                    id: id,
                },
                data: {
                    clientId,
                    brand,
                    model,
                    year,
                    licensePlate,
                },
            });
            res.json(updatedVehicle);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
    deleteVehicle = async (req, res) => {
        const { id } = req.params;
        try {
            const deleteVehicle = await postgres_1.prisma.vehicle.delete({
                where: {
                    id: id,
                },
            });
            res.json(deleteVehicle);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
}
exports.VehicleController = VehicleController;
//# sourceMappingURL=controller.js.map