import { pgTable, uuid, timestamp, pgEnum, decimal } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import user from "./user";
import seller from "./seller";
import { orderEnum } from "./helper/enum";

const order = pgTable("order", {
  order_id: uuid("order_id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id").references(() => user.user_id),
  seller_id: uuid("seller_id").references(() => seller.seller_id),
  order_date: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
  order_status: orderEnum("orderEnum").notNull(),
  total_amount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});

export const orderRelations = relations(order, ({ one }) => ({
  users: one(user, { fields: [order.user_id], references: [user.user_id] }),
  sellers: one(seller, {
    fields: [order.seller_id],
    references: [seller.seller_id],
  }),
}));

export default order;
