import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  DIRECT_URL: get("DIRECT_URL").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
};
