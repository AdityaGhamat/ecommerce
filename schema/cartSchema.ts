import { z } from "zod";
export const cartCreationSchema = z.object({
  cart_id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
});
