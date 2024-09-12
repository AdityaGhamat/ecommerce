import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createCategorySchema,
  editCategorySchema,
} from "../../../schema/categorySchema";
import type {
  editCategoryType,
  insertCategoryType,
} from "../../types/categoryTypes";
import {
  createCategory,
  editCategory,
} from "../../controller/categorycontroller";
import { authmiddleware } from "../../middleware";
const app = new Hono();
app.use(authmiddleware);
app.post("/", zValidator("json", createCategorySchema), async (c) => {
  const { category_name, category_description } = c.req.valid("json");
  const body: insertCategoryType = { category_name, category_description };
  return await createCategory(c, body);
});
app.put("/edit", zValidator("json", editCategorySchema), async (c) => {
  const { category_name, category_description } = c.req.valid("json");
  const category_id = c.req.query("category_id");
  const body: editCategoryType = {
    category_name,
    category_description,
    category_id,
  };
  return await editCategory(c, body);
});

export default app;
