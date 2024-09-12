import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { serverconfig } from "../config";
import { schema } from "../model/schema";
const queryClient = postgres(
  `postgres://${serverconfig.POSTGRES_USER}:${serverconfig.POSTGRES_PASSWORD}@localhost:5433/${serverconfig.POSTGRES_DB}`
);
export const db = drizzle(queryClient, { schema: schema, logger: true });
