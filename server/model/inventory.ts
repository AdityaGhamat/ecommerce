import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import product from "./product";
import seller from "./seller";
import { relations } from "drizzle-orm";

const inventory = pgTable("inventory", {
  inventory_id: uuid("inventory_id").primaryKey().defaultRandom().notNull(),
  product_id: uuid("product_id")
    .references(() => product.product_id)
    .notNull(),
  seller_id: uuid("seller_id")
    .references(() => seller.seller_id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(product, {
    fields: [inventory.product_id],
    references: [product.product_id],
  }),
  seller: one(seller, {
    fields: [inventory.seller_id],
    references: [seller.seller_id],
  }),
}));
export default inventory;
