import {
  pgTable,
  uuid,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import user from "./user";
import product from "./product";

const review = pgTable("review", {
  review_id: uuid("review_id").primaryKey().defaultRandom().notNull(),
  user_id: uuid("user_id")
    .references(() => user.user_id)
    .notNull(),
  product_id: uuid("product_id")
    .references(() => product.product_id)
    .notNull(),
  rating: integer("rating").notNull(),
  review: varchar("review", { length: 255 }),
  createdAt: timestamp("createdAt", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
});
export const reviewRelations = relations(review, ({ one }) => ({
  user: one(user, { fields: [review.user_id], references: [user.user_id] }),
  product: one(product, {
    fields: [review.product_id],
    references: [product.product_id],
  }),
}));
export default review;
