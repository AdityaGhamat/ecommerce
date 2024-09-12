import { uuid, integer, pgTable } from "drizzle-orm/pg-core";
import cart from "./cart";
import product from "./product";
import { relations } from "drizzle-orm";
const cartItems = pgTable("cartItems", {
  cartItem_id: uuid("cartItem_id").primaryKey().defaultRandom().notNull(),
  cart_id: uuid("cart_id")
    .references(() => cart.cart_id)
    .notNull(),
  product_id: uuid("product_id")
    .references(() => product.product_id)
    .notNull(),
  quantity: integer("quantity").notNull(),
});
export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, { fields: [cartItems.cart_id], references: [cart.cart_id] }),
  product: one(product, {
    fields: [cartItems.product_id],
    references: [product.product_id],
  }),
}));
export default cartItems;
