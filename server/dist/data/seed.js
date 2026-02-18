"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_adapter_1 = require("../config/bcrypt.adapter");
const postgres_1 = require("./postgres");
(async () => {
    console.log("Comenzando el Seeding...");
    // Borramos todos los usuarios para empezar de cero
    await postgres_1.prisma.user.deleteMany();
    // Encriptamos la contraseña
    const hashedPassword = await bcrypt_adapter_1.BcryptAdapter.hash("123456");
    // Creamos el admin
    const admin = await postgres_1.prisma.user.create({
        data: {
            name: "Admin",
            email: "admin@google.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });
    console.log("Usuario creado con éxito");
    console.log({
        name: admin.name,
        email: admin.email,
        password: "123456 (Original)",
    });
    await postgres_1.prisma.$disconnect();
})();
//# sourceMappingURL=seed.js.map