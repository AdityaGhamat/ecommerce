import { Hono } from "hono";
import {
  createReview,
  deleteReview,
  editReview,
} from "../../controller/reviewcontroller";
import {
  createReviewSchema,
  editReviewSchema,
} from "../../../schema/reviewSchema";
import { zValidator } from "@hono/zod-validator";
const app = new Hono<{ Variables: { user_id: string } }>();
app.post("/", zValidator("json", createReviewSchema), async (c) => {
  const user_id = c.get("user_id");
  const product_id = c.req.query("product_id");
  const { rating, reviews } = c.req.valid("json");
  const body = { user_id, product_id, rating, reviews };
  return await createReview(c, body);
});
app.put("/", zValidator("json", editReviewSchema), async (c) => {
  const user_id = c.get("user_id");
  const product_id = c.req.query("product_id") as string;
  const { rating, reviews } = c.req.valid("json");
  const body = { user_id, product_id, rating, reviews };
  return await editReview(c, body);
});
app.delete("/", async (c) => {
  const review_id = c.req.query("product_id") as string;
  return await deleteReview(c, review_id);
});
export default app;
