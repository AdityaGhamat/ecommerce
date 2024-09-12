import {
  pgTable,
  uuid,
  varchar,
  decimal,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import seller from "./seller";
import { relations, sql } from "drizzle-orm";
import category from "./category";

const product = pgTable("product", {
  product_id: uuid("product_id").primaryKey().defaultRandom().notNull(),
  seller_id: uuid("seller_id")
    .references(() => seller.seller_id)
    .notNull(),
  product_name: varchar("product_name", { length: 255 }).notNull(),
  product_description: varchar("product_description", {
    length: 255,
  }).notNull(),
  product_price: integer("product_price").notNull(),
  product_stock: integer("product_stock").notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
  category_id: uuid("category_id").references(() => category.category_id),
});
export const productRelations = relations(product, ({ one }) => ({
  seller: one(seller, {
    fields: [product.seller_id],
    references: [seller.seller_id],
  }),
  category: one(category, {
    fields: [product.category_id],
    references: [category.category_id],
  }),
}));
export default product;
