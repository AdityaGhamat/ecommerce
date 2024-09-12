import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import user from "./user";
import { sellerEnum } from "./helper/enum";
const seller = pgTable(
  "seller",
  {
    seller_id: uuid("seller_id").primaryKey().defaultRandom().notNull(),
    user_id: uuid("user_id")
      .references(() => user.user_id)
      .notNull(),
    store_name: varchar("store_name", { length: 255 }).notNull(),
    store_description: varchar("store_description", { length: 255 }).notNull(),
    status: sellerEnum("sellerEnum"),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
      withTimezone: true,
    })
      .default(sql`now()`)
      .notNull(),
  },
  (seller_table) => ({
    store_name_index: index("store_name_index").on(seller_table.store_name),
    store_description_index: index("store_description_index").on(
      seller_table.store_description
    ),
  })
);

export const sellerRelations = relations(seller, ({ one }) => ({
  user: one(user, { fields: [seller.user_id], references: [user.user_id] }),
}));

export default seller;
