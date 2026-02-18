import { Request, Response } from "express";
export declare class VehicleController {
    constructor();
    createVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getVehicles: (req: Request, res: Response) => Promise<void>;
    getVehicleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteVehicle: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map