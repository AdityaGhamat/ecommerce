import { defineConfig } from "drizzle-kit";
import { serverconfig } from "./config";
export default defineConfig({
  schema: "./server/model/*",
  out: "./server/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgres://${serverconfig.POSTGRES_USER}:${serverconfig.POSTGRES_PASSWORD}@localhost:5433/${serverconfig.POSTGRES_DB}`,
  },
});

// schema: "./server/models/*",
// out: "./server/db/migrations",
