import { Hono } from "hono";
import {} from "../../controller/reviewcontroller";
import { zValidator } from "@hono/zod-validator";
import { createReviewSchema } from "../../../schema/reviewSchema";
const app = new Hono<{ Variables: { user_id: string } }>();
app.post("/", zValidator("json", createReviewSchema), async (c) => {
  const user_id = c.get("user_id");
});
export default app;
