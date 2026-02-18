"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const postgres_1 = require("../../data/postgres");
const handle_error_1 = require("../../utils/handle-error");
class JobController {
    constructor() { }
    createJob = async (req, res) => {
        try {
            const { vehicleId, assignedMechanicId, description, cost } = req.body;
            if (!vehicleId)
                return res.status(400).json({ error: "Vehicle is required" });
            if (!assignedMechanicId)
                return res.status(400).json({ error: "Mechanic is required" });
            if (!description)
                return res.status(400).json({ error: "Description is required" });
            if (cost === undefined)
                return res.status(400).json({ error: "Cost is required" });
            const newJob = await postgres_1.prisma.job.create({
                data: {
                    vehicleId,
                    assignedMechanicId,
                    description,
                    cost: Number(cost),
                },
            });
            res.json(newJob);
        }
        catch (error) {
            res.status(500).json({ error: "Error creating job, Review ids" });
        }
    };
    getJobs = async (req, res) => {
        const jobs = await postgres_1.prisma.job.findMany({
            include: {
                mechanic: {
                    select: { name: true, email: true }, // Solo traemos nombre y email de user
                },
                vehicle: {
                    include: {
                        client: true,
                    },
                },
            },
        });
        res.json(jobs);
    };
    updateJob = async (req, res) => {
        const { id } = req.params; // Saco el id del url
        const { description, status, cost, vehicleId, assignedMechanicId } = req.body; // Sacamos los datos nuevos.
        if (!description && !status && !cost && !vehicleId && !assignedMechanicId) {
            return res.status(400).json({
                error: "At least one property (description, status, cost, vehicleId, assignedMechanicId) is required to update",
            });
        }
        try {
            const data = {
                description: description,
                status: status,
                cost: cost ? Number(cost) : undefined,
                vehicleId,
                assignedMechanicId,
            };
            if (status) {
                if (status === "COMPLETED") {
                    data.closedAt = new Date();
                }
                else {
                    data.closedAt = null;
                }
            }
            const updatedJob = await postgres_1.prisma.job.update({
                where: {
                    id: id,
                },
                data: data,
            });
            res.json(updatedJob);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
    deleteJob = async (req, res) => {
        const { id } = req.params;
        try {
            const deletedJob = await postgres_1.prisma.job.delete({
                where: {
                    id: id,
                },
            });
            res.json(deletedJob);
        }
        catch (error) {
            (0, handle_error_1.handleHttpError)(res, error);
        }
    };
}
exports.JobController = JobController;
//# sourceMappingURL=controller.js.map