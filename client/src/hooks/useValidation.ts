import { ZodError, ZodSchema } from "zod";

export const useValidation = <T>(schema: ZodSchema<T>) => {
  const validate = (data: T) => {
    try {
      const parsedData = schema.parse(data);
      return { success: true, data: parsedData };
    } catch (error: any) {
      if (error instanceof ZodError) {
        return { success: false, errors: error.errors };
      }
      return { success: false, errors: error.message };
    }
  };

  return { validate };
};
