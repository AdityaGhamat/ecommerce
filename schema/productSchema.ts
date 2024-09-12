import { z } from "zod";
export const createProductSchema = z.object({
  seller_id: z.string().uuid(),
  product_name: z
    .string()
    .min(5)
    .max(40)
    .refine((name) => name.length >= 5, {
      message: "Product name must be at least 5 characters long",
    }),
  product_description: z.string().min(30).max(200),
  product_price: z.number().int().positive().max(1000000),
  product_stock: z.number().int().nonnegative(),
  image_url: z.string().url().max(100),
  category_id: z.string().uuid(),
});

export const editStocksSchema = z.object({
  product_stock: z.number().int().nonnegative(),
  product_id: z.string().uuid().optional(),
});

export const editProductSchema = z.object({
  seller_id: z.string().uuid().optional(),
  product_name: z
    .string()
    .min(5)
    .max(40)
    .refine((name) => name.length >= 5, {
      message: "Product name must be at least 5 characters long",
    })
    .optional(),
  product_description: z.string().min(30).max(200).optional(),
  product_price: z.number().int().positive().max(1000000).optional(),
  product_stock: z.number().int().nonnegative().optional(),
  image_url: z.string().url().max(225).optional(),
  category_id: z.string().uuid().optional(),
  product_id: z.string().uuid().optional(),
});
