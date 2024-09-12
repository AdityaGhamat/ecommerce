import { pgEnum, pgTable, uuid, timestamp, decimal } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import order from "./order";
import { payment_method_enum, payment_status } from "./helper/enum";

const payment = pgTable("payment", {
  payment_id: uuid("payment_id").primaryKey().defaultRandom().notNull(),
  order_id: uuid("order_id")
    .references(() => order.order_id)
    .notNull(),
  payment_method: payment_method_enum("payment_method_enum").notNull(),
  payment_status: payment_status("payment_status").notNull(),
  payment_date: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
  payment_amount: decimal("payment_amount").notNull(),
});

export const paymentRelations = relations(payment, ({ one }) => ({
  order: one(order, {
    fields: [payment.order_id],
    references: [order.order_id],
  }),
}));
export default payment;
