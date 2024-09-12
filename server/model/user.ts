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
