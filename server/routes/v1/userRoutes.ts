import { Hono } from "hono";
import {
  createuser,
  loginuser,
  updateUsername,
  updatePassword,
  updateEmail,
} from "../../controller/usercontroller";
import { zValidator } from "@hono/zod-validator";
import {
  createUserSchema,
  loginUserSchema,
  updateEmailSchema,
  updatePasswordSchema,
  updateUserNameSchema,
} from "../../../schema/userSchema";
import { authmiddleware } from "../../middleware";
const app = new Hono<{ Variables: { user_id: string } }>();

app.post("/signup", zValidator("json", createUserSchema), async (c) => {
  const body = c.req.valid("json");
  return createuser(c, body);
});
app.post("/login", zValidator("json", loginUserSchema), async (c) => {
  const body = c.req.valid("json");
  return loginuser(c, body);
});

app.use(authmiddleware);

app.put("/username", zValidator("json", updateUserNameSchema), async (c) => {
  const { username } = c.req.valid("json");
  const user_id = c.get("user_id");
  console.log(user_id);
  const body = { username, user_id };
  return updateUsername(c, body);
});
app.put("/password", zValidator("json", updatePasswordSchema), async (c) => {
  const { password, old_password } = c.req.valid("json");
  const user_id = c.get("user_id");
  const body = { password, user_id, old_password };
  return updatePassword(c, body);
});
app.put("/email", zValidator("json", updateEmailSchema), async (c) => {
  const { email } = c.req.valid("json");
  const user_id = c.get("user_id");
  const body = { email, user_id };
  return updateEmail(c, body);
});

export default app;
