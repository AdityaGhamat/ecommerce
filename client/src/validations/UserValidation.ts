import { loginUserSchema, createUserSchema } from "@schema/userSchema";
import { ZodError } from "zod";
export const validateLogin = (email: string, password: string) => {
  try {
    const parsedData = loginUserSchema.parse({ email, password });
    return { success: true, data: parsedData };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: error.message };
  }
};
export const validateSignup = (
  username: string,
  email: string,
  password: string
) => {
  try {
    const parsedData = createUserSchema.parse({ username, email, password });
    return { success: true, data: parsedData };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.errors };
    }
    return { success: false, errors: error.message };
  }
};
