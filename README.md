# 🔧 TallerManager - SaaS de Gestión de Activos

Sistema integral para la gestión de talleres mecánicos. Este proyecto permite centralizar el control de clientes, flota de vehículos y métricas de facturación en una interfaz moderna, profesional y eficiente.

---

## 🚀 Características Principales

- **Dashboard en tiempo real**: Visualización dinámica de métricas clave como ingresos, volumen de clientes y reparaciones activas.
- **Gestión de Sesiones (Auth)**: Autenticación segura mediante JWT y manejo de estado global reactivo con React Context API.
- **Sidebar Inteligente**: Interfaz lateral que reconoce al usuario conectado, muestra sus iniciales y su rol (Admin/Mecánico).
- **Arquitectura Limpia**: Backend estructurado en capas (Rutas, Controladores y Adaptadores) para facilitar la escalabilidad.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React (Vite), TypeScript, Tailwind CSS.
- **Backend**: Node.js, Express, TypeScript.
- **Base de Datos**: PostgreSQL con Prisma ORM.
- **Seguridad**: Bcrypt para el hashing de contraseñas y JWT para tokens de sesión.

---

## 🏗️ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/cvidaal/taller-manager
cd taller-manager

# Instalar dependencias del Cliente
cd client
npm install

# Instalar dependencias del Servidor
cd ../server
npm install
```

---

### 2. Variables de Entorno

Crea un archivo `.env` dentro de la carpeta `/server`:

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@localhost:5432/taller_db"
JWT_SECRET="tu_semilla_secreta_para_tokens"
```

---

### 3. Base de Datos y Seed (Inicialización)

Para generar las tablas y crear el usuario administrador por defecto, ejecuta los siguientes comandos dentro de la carpeta `/server`:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

---

## 🔑 Credenciales de Acceso (Modo Prueba)

Una vez ejecutado el script de Seeding, utiliza estas credenciales predefinidas para acceder al sistema:

- **Email:** admin@google.com
- **Contraseña:** 123456

⚠️ Usuario de prueba sin datos reales. Proyecto únicamente demostrativo.
---



## 📸 Vista Previa del Proyecto

_(Añade aquí las rutas reales a tus capturas de pantalla una vez subidas al repositorio)_

- **Dashboard:** Vista principal con las métricas del taller.
  ![Dashboard](./assets/dashboard.png)

- **Autenticación:** Login para el mecánico
  ![Login](./assets/login.jpeg)

- **Vehículos**: Vista de pantalla vehículos
  ![Vehicle](./assets/vehicles.png)

- **Clientes**: Vista de pantalla clientes
  ![Client](./assets/client.png)

- **Buscador**: Buscador avanzado en tiempo real
  ![Search](./assets/searchAdvanced.png)
