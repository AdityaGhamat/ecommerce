import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import admin_permission from "./admin_permission";
import { adminEnum } from "./helper/enum";
const admin = pgTable(
  "admin",
  {
    admin_id: uuid("admin_id").primaryKey().defaultRandom().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    admin_role: adminEnum("adminEnum").notNull(),
    admin_permission_id: uuid("admin_permission_id").references(
      () => admin_permission.admin_permission_id
    ),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
      .default(sql`now()`)
      .notNull(),
    last_login: timestamp("createdAt", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
      .default(sql`now()`)
      .notNull(),
  },
  (admin) => {
    return {
      adminIndex: uniqueIndex("admin_email_index").on(admin.email),
    };
  }
);

export const adminRelations = relations(admin, ({ one }) => ({
  admin_permission: one(admin_permission, {
    fields: [admin.admin_permission_id],
    references: [admin_permission.admin_permission_id],
  }),
}));

export default admin;
