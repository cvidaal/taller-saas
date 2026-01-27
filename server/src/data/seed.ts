import { BcryptAdapter } from "../config/bcrypt.adapter";
import { prisma } from "./postgres";

(async () => {
  console.log("Comenzando el Seeding...");

  // Borramos todos los usuarios para empezar de cero
  await prisma.user.deleteMany();

  // Encriptamos la contraseña
  const hashedPassword = await BcryptAdapter.hash("123456");

  // Creamos el admin
  const admin = await prisma.user.create({
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

  await prisma.$disconnect();
})();
