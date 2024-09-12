import { Hono } from "hono";
import {
  createProduct,
  editProduct,
  editStocks,
  productReview,
  removeProduct,
  searchProduct,
} from "../../controller/productcontroller";
import { sellerauthmiddleware } from "../../middleware/sellerauthmiddleware";
import { zValidator } from "@hono/zod-validator";
import {
  createProductSchema,
  editProductSchema,
  editStocksSchema,
} from "../../../schema/productSchema";
import type { searchProductType } from "../../types/productTypes";
const app = new Hono<{ Variables: { user_id: string } }>();
app.use(sellerauthmiddleware);
app.post("/", zValidator("json", createProductSchema), async (c) => {
  const body = c.req.valid("json");
  return await createProduct(c, body);
});
app.put("/", zValidator("json", editProductSchema), async (c) => {
  const body = c.req.valid("json");
  return await editProduct(c, body);
});
app.put("/stocks", zValidator("json", editStocksSchema), async (c) => {
  const body = c.req.valid("json");
  return await editStocks(c, body);
});
app.get("/search", async (c) => {
  const searchText = c.req.query("searchText");
  const page = c.req.query("page");
  const pageSize = c.req.query("pageSize");
  const body = { searchText, page, pageSize };
  return await searchProduct(c, body as searchProductType);
});
app.get("/review", async (c) => {
  const product_id = c.req.query("product_id") as string;
  return await productReview(c, product_id);
});
app.delete("/", async (c) => {
  const product_id = c.req.query("product_id") as string;
  return await removeProduct(c, product_id);
});
export default app;
