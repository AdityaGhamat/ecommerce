import { user } from "../model";

export type userSelect = typeof user.$inferSelect;
export type userInsert = typeof user.$inferInsert;
export type loginUser = Pick<userInsert, "email" | "password">;
export type updateEmailType = Pick<userInsert, "email" | "user_id">;
export type updatePasswordType = Pick<userInsert, "password" | "user_id">;
export type updateUsernameType = Pick<userInsert, "username" | "user_id">;
