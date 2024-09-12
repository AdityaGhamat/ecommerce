import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import user from "./user";

const cart = pgTable("cart", {
  cart_id: uuid("cart_id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id").references(() => user.user_id),
  createdAt: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
});

export const cartRelations = relations(cart, ({ one }) => ({
  users: one(user, { fields: [cart.user_id], references: [user.user_id] }),
}));

export default cart;
