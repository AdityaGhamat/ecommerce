import { z } from "zod";
import type {
  editStocksSchema,
  createProductSchema,
  editProductSchema,
} from "../../schema/productSchema";
export type createProductType = z.infer<typeof createProductSchema>;
export type editStocksType = z.infer<typeof editStocksSchema>;
export type searchProductType = {
  searchText: string;
  page?: number;
  pageSize?: number;
};
export type editProductType = z.infer<typeof editProductSchema>;
