export declare class JwtAdapter {
    static generateToken(payload: object, duration?: string): Promise<unknown>;
    static validateToken<T>(token: string): Promise<T | null>;
}
//# sourceMappingURL=jwt.adapter.d.ts.map