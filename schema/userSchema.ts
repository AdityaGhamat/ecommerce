import { z } from "zod";
export const createUserSchema = z.object({
  username: z.string().min(5).max(15),
  email: z.string().email().min(5).max(25),
  password: z.string().min(6).max(25),
});
export const loginUserSchema = z.object({
  email: z.string().email().min(5).max(25),
  password: z.string().min(5).max(15),
});
export const updateUserNameSchema = z.object({
  username: z.string().min(5).max(15),
});
export const updateEmailSchema = z.object({
  email: z.string().email().min(5).max(25),
});
export const updatePasswordSchema = z.object({
  password: z.string().min(6).max(25),
});
