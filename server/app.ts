import { Hono } from "hono";
import { logger } from "hono/logger";
import { config } from "dotenv";

import {
  userRoutes,
  sellerRoutes,
  categoryRoutes,
  productRoutes,
  reviewRoutes,
} from "./routes/v1";
import type { customEnvType } from "./config/envconfig";

const app = new Hono<customEnvType>();
app.use(logger());

const apiRoutes = app
  .basePath("/api/v1")
  .route("/user", userRoutes)
  .route("/seller", sellerRoutes)
  .route("/category", categoryRoutes)
  .route("/product", productRoutes)
  .route("/review", reviewRoutes);

app.get("/", (c) => {
  return c.json({
    name: "no-name-project",
  });
});

export default app;
type UserRoutes = typeof userRoutes;
export type ApiRoutes = typeof apiRoutes;
