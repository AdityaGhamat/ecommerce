import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import user from "./user";

const wishlist = pgTable("wishlist", {
  wishlist_id: uuid("wishlist_id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id").references(() => user.user_id),
  createdAt: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
});

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  users: one(user, { fields: [wishlist.user_id], references: [user.user_id] }),
}));

export default wishlist;
