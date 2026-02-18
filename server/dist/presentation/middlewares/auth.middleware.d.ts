import { NextFunction, Request, Response } from "express";
export declare class AuthMiddleware {
    static validateJWT(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static restricTo: (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
}
//# sourceMappingURL=auth.middleware.d.ts.map