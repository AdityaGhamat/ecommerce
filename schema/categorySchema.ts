import { z } from "zod";
export const createCategorySchema = z.object({
  category_name: z.string().min(5).max(45),
  category_description: z.string().min(45).max(100),
});
export const editCategorySchema = z.object({
  category_name: z.string().min(5).max(45).optional(),
  category_description: z.string().min(45).max(100).optional(),
  category_id: z.string().uuid().optional(),
});
