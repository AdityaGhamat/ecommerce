import { z } from "zod";

const sellerEnum = z.enum(["active", "inactive"]).optional();
export const sellerSchema = z.object({
  seller_id: z.string().uuid().optional(),
  user_id: z.string().uuid().optional(),
  store_name: z.string().min(5).max(35),
  store_description: z.string().min(30).max(200),
  seller_status: sellerEnum,
});

export const sellerSearch = z.object({
  searchText: z.string().min(3).max(35),
});
