import type { Env } from "hono";

export interface customEnvType extends Env {
  BCRYPT_HASH: string;
  JWT_SECRET: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: string;
  POSTGRES_HOST: string;
}
