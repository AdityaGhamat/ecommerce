import { z } from "zod";
import type {
  createReviewSchema,
  editReviewSchema,
} from "../../schema/reviewSchema";
import type { review } from "../model";
export type createReviewType = z.infer<typeof createReviewSchema>;
export type reviewSelect = typeof review.$inferSelect;
export type editReviewType = z.infer<typeof editReviewSchema>;
