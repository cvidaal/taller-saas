import { Request, Response } from "express";
export declare class ClientController {
    constructor();
    createClient: (req: Request, res: Response) => Promise<void>;
    getClients: (req: Request, res: Response) => Promise<void>;
    updateClient: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteClient: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map