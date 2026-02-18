import { Request, Response } from "express";
export declare class AuthController {
    constructor();
    loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getProfile: (req: Request, res: Response) => Response<any, Record<string, any>>;
}
//# sourceMappingURL=controller.d.ts.map