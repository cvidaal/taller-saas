import "dotenv/config";
import { get } from "env-var";

const corsOrigins = get("CORS_ORIGINS").default("http://localhost:5173").asString();

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  DIRECT_URL: get("DIRECT_URL").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  CORS_ORIGINS: corsOrigins.split(",").map((o) => o.trim()).filter(Boolean),
};
