import { z } from "zod";

export const createReviewSchema = z.object({
  user_id: z.string().uuid().optional(),
  product_id: z.string().uuid(),
  rating: z.number().int(),
  reviews: z.string().min(20).max(255),
});
export const editReviewSchema = z.object({
  review_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  product_id: z.string().uuid().optional(),
  rating: z.number().int().optional(),
  reviews: z.string().min(20).max(255).optional(),
});
