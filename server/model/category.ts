import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

const category = pgTable("category", {
  category_id: uuid("category_id").primaryKey().defaultRandom().notNull(),
  category_name: varchar("category_name", { length: 255 }).notNull(),
  category_description: varchar("category_description", {
    length: 255,
  }).notNull(),
});

export default category;
