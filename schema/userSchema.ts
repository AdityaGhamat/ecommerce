import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(25, { message: "Email must not exceed 25 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(25, { message: "Password must not exceed 25 characters" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(25, { message: "Email must not exceed 25 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(15, { message: "Password must not exceed 15 characters" }),
});

export const updateUserNameSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters long" })
    .max(15, { message: "Username must not exceed 15 characters" }),
});

export const updateEmailSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(25, { message: "Email must not exceed 25 characters" }),
});

export const updatePasswordSchema = z.object({
  user_id: z.string().uuid({ message: "Invalid user ID format" }).optional(),
  old_password: z
    .string()
    .min(6, { message: "Old password must be at least 6 characters long" })
    .max(25, { message: "Old password must not exceed 25 characters" }),
  password: z
    .string()
    .min(6, { message: "New password must be at least 6 characters long" })
    .max(25, { message: "New password must not exceed 25 characters" }),
});
