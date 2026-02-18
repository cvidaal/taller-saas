export declare class BcryptAdapter {
    static hash: (password: string) => Promise<string>;
    static compare: (password: string, hashed: string) => Promise<boolean>;
}
//# sourceMappingURL=bcrypt.adapter.d.ts.map