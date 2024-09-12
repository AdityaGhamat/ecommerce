import { Hono } from "hono";
import {
  changeStoreStatusToActive,
  searchSeller,
  signupSellerAccount,
  changeStoreStatusToInActive,
} from "../../controller/sellercontroller";
import { zValidator } from "@hono/zod-validator";
import { sellerSchema, sellerSearch } from "../../../schema/sellerSchema";
import type { sellerstatusChange } from "../../types/sellerTypes";
import { authmiddleware } from "../../middleware";

const app = new Hono<{ Variables: { user_id: string } }>();
app.use(authmiddleware);
app.post("/", zValidator("json", sellerSchema), async (c) => {
  const bodytemp = c.req.valid("json");
  const { seller_status, store_name, store_description } = bodytemp;
  const user_id = c.get("user_id");
  const body = {
    user_id,
    seller_status,
    store_name,
    store_description,
  };
  return signupSellerAccount(c, body);
});
app.put("/active-status", async (c) => {
  const user_id = c.get("user_id");
  const body: sellerstatusChange = { user_id };
  return changeStoreStatusToActive(c, body);
});
app.put("/inactive-status", async (c) => {
  const user_id = c.get("user_id");
  const body: sellerstatusChange = { user_id };
  return changeStoreStatusToInActive(c, body);
});
app.get("/search", async (c) => {
  const searchText = c.req.query("searchText");
  return searchSeller(c, searchText as string);
});
export default app;
