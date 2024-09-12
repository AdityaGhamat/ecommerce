import { json, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const admin_permission = pgTable("admin_permission_table", {
  admin_permission_id: uuid("admin_permission_id")
    .defaultRandom()
    .primaryKey()
    .notNull(),
  admin_role_name: varchar("admin_role_name", { length: 255 }).notNull(),
  admin_permission: json("admin_permission").notNull(),
});

export default admin_permission;
