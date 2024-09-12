import { pgEnum, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import order from "./order";
import address from "./address";
import { shippingEnum } from "./helper/enum";
const shipping = pgTable("shipping", {
  shipping_id: uuid("shipping_id").primaryKey().defaultRandom().notNull(),
  order_id: uuid("order_id").references(() => order.order_id),
  address_id: uuid("address_id").references(() => address.address_id),
  tracking_number: varchar("tracking_number", { length: 255 }),
  shipping_status: shippingEnum("shippingEnum"),
  shipping_date: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
});
export const shippingRelations = relations(shipping, ({ one }) => ({
  order: one(order, {
    fields: [shipping.order_id],
    references: [order.order_id],
  }),
  address: one(address, {
    fields: [shipping.address_id],
    references: [address.address_id],
  }),
}));

export default shipping;
