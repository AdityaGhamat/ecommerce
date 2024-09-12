import { decimal, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import order from "./order";
import product from "./product";
import { relations } from "drizzle-orm";

const orderItem = pgTable("orderItem", {
  orderItem_id: uuid("orderItem_id").primaryKey().defaultRandom().notNull(),
  order_id: uuid("order_id")
    .references(() => order.order_id)
    .notNull(),
  product_id: uuid("product_id")
    .references(() => product.product_id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price_at_purchase: decimal("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
});

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, {
    fields: [orderItem.order_id],
    references: [order.order_id],
  }),
  product: one(product, {
    fields: [orderItem.product_id],
    references: [product.product_id],
  }),
}));

export default orderItem;
