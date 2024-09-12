import { pgEnum } from "drizzle-orm/pg-core";
export const userenum = pgEnum("userEnum", ["customer", "seller"]);
export const shippingEnum = pgEnum("shippingEnum", [
  "pending",
  "shipped",
  "delivered",
  "returned",
]);
export const sellerEnum = pgEnum("sellerEnum", ["active", "inactive"]);
export const payment_method_enum = pgEnum("payment_method_enum", [
  "stripe",
  "pay on delivery",
]);
export const payment_status = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
]);
export const orderEnum = pgEnum("orderEnum", [
  "pending",
  "shipped",
  "delivered",
  "cancelled",
]);
export const adminEnum = pgEnum("adminEnum", [
  "super_admin",
  "product_manager",
  "order_manager",
]);
export const addressEnum = pgEnum("addressEnum", ["billing", "shipping"]);
