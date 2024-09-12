import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { serverconfig } from "../config";

const migrationClient = postgres(
  `postgres://${serverconfig.POSTGRES_USER}:${serverconfig.POSTGRES_PASSWORD}@localhost:5433/${serverconfig.POSTGRES_DB}`,
  { max: 1 }
);

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./server/migrations",
  });
  await migrationClient.end();
}
main();
