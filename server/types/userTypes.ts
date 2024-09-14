import type { updatePasswordSchema } from "../../schema/userSchema";
import { user } from "../model";
import z from "zod";

export type userSelect = typeof user.$inferSelect;
export type userInsert = typeof user.$inferInsert;
export type loginUser = Pick<userInsert, "email" | "password">;
export type updateEmailType = Pick<userInsert, "email" | "user_id">;
export type updatePasswordType = z.infer<typeof updatePasswordSchema>;
export type updateUsernameType = Pick<userInsert, "username" | "user_id">;
