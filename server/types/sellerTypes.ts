import { seller } from "../model";
import { z } from "zod";
export type sellerSelect = typeof seller.$inferSelect;
export type sellerInsert = typeof seller.$inferInsert;
export type sellerstatusChange = Pick<sellerInsert, "status" | "user_id">;
