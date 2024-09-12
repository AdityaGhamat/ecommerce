import type {
  createCategorySchema,
  editCategorySchema,
} from "../../schema/categorySchema";
import { category } from "../model";
import { z } from "zod";
export type categorySelect = typeof category.$inferSelect;
export type categoryInsert = typeof category.$inferInsert;
export type insertCategoryType = z.infer<typeof createCategorySchema>;
export type editCategoryType = z.infer<typeof editCategorySchema>;
