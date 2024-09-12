import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import user from "./user";
import { relations } from "drizzle-orm";
import { addressEnum } from "./helper/enum";

const address = pgTable("address", {
  address_id: uuid("address_id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => user.user_id)
    .notNull(),
  address_line_1: varchar("address_line_1", { length: 255 }).notNull(),
  address_line_2: varchar("address_line_2", { length: 255 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 255 }),
  postal_code: varchar("postal_code", { length: 255 }),
  country: varchar("country", { length: 255 }),
  address_type: addressEnum("addressEnum"),
});

export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, { fields: [address.user_id], references: [user.user_id] }),
}));
export default address;
export type addressSelect = typeof address.$inferSelect;
export type addressInsert = typeof address.$inferInsert;
