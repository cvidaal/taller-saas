import { Request, Response } from "express";
export declare class UserController {
    constructor();
    createUser: (req: Request, res: Response) => Promise<void>;
    getUsers: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=controller.d.ts.map