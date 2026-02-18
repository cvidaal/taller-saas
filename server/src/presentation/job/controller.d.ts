import { Request, Response } from "express";
export declare class JobController {
    constructor();
    createJob: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getJobs: (req: Request, res: Response) => Promise<void>;
    updateJob: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteJob: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map