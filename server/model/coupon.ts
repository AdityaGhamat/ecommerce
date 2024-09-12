import {
  boolean,
  decimal,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
const coupon = pgTable("coupon", {
  coupon_id: uuid("coupon_id").primaryKey().defaultRandom().notNull(),
  coupon_code: varchar("coupon_code", { length: 255 }).notNull(),
  coupon_discount_percentage: decimal("coupon_discount_percentage", {
    precision: 10,
    scale: 2,
  }).notNull(),
  valid_from: timestamp("valid_from", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  })
    .default(sql`now()`)
    .notNull(),
  valid_to: timestamp("valid_to", {
    mode: "date",
    precision: 3,
    withTimezone: true,
  }).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
});

export default coupon;
