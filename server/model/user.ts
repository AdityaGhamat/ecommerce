import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { userenum } from "./helper/enum";
const user = pgTable(
  "user",
  {
    user_id: uuid("id").primaryKey().defaultRandom().notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    user_type: userenum("userEnum").default("customer").notNull(),
    reset_password_token: varchar("reset_password_token", { length: 255 }),
    reset_password_token_expires_at: timestamp(
      "reset_password_token_expires_at",
      {
        mode: "date",
        precision: 3,
        withTimezone: true,
      }
    ),
    verification_token: varchar("verification_token", { length: 255 }),
    verification_token_expires_at: timestamp("verification_token_expires_at", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    }),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
      .default(sql`now()`)
      .notNull(),
  },
  (user) => {
    return {
      emailIndex: uniqueIndex("email_index").on(user.email),
    };
  }
);

export default user;
