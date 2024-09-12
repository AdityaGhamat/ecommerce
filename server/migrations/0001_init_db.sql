CREATE TABLE IF NOT EXISTS "address" (
	"address_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"address_line_1" varchar(255) NOT NULL,
	"address_line_2" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"postal_code" varchar(255),
	"country" varchar(255),
	"addressEnum" "addressEnum"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin_permission_table" (
	"admin_permission_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_role_name" varchar(255) NOT NULL,
	"admin_permission" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"admin_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"adminEnum" "adminEnum" NOT NULL,
	"admin_permission_id" uuid,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cart" (
	"cart_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cartItems" (
	"cartItem_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cart_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_name" varchar(255) NOT NULL,
	"category_description" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coupon" (
	"coupon_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"coupon_code" varchar(255) NOT NULL,
	"coupon_discount_percentage" numeric(10, 2) NOT NULL,
	"valid_from" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"valid_to" timestamp (3) with time zone NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inventory" (
	"inventory_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"seller_id" uuid NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"order_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"seller_id" uuid,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"orderEnum" "orderEnum" NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderItem" (
	"orderItem_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"price_at_purchase" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"payment_method_enum" "payment_method_enum" NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"payment_amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"product_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"product_description" varchar(255) NOT NULL,
	"product_price" numeric(10, 2) NOT NULL,
	"product_stock" integer NOT NULL,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"category_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review" (
	"review_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"product_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"review" varchar(255),
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seller" (
	"seller_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"store_name" varchar(255) NOT NULL,
	"store_description" varchar(255) NOT NULL,
	"sellerEnum" "sellerEnum",
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shipping" (
	"shipping_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid,
	"address_id" uuid,
	"tracking_number" varchar(255),
	"shippingEnum" "shippingEnum",
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"userEnum" "userEnum" DEFAULT 'customer' NOT NULL,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist" (
	"wishlist_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"createdAt" timestamp (3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "admin" ADD CONSTRAINT "admin_admin_permission_id_admin_permission_table_admin_permission_id_fk" FOREIGN KEY ("admin_permission_id") REFERENCES "public"."admin_permission_table"("admin_permission_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_cart_id_cart_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("cart_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "inventory" ADD CONSTRAINT "inventory_seller_id_seller_seller_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."seller"("seller_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_seller_id_seller_seller_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."seller"("seller_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_seller_id_seller_seller_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."seller"("seller_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review" ADD CONSTRAINT "review_product_id_product_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("product_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "seller" ADD CONSTRAINT "seller_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping" ADD CONSTRAINT "shipping_order_id_order_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("order_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping" ADD CONSTRAINT "shipping_address_id_address_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("address_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "admin_email_index" ON "admin" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_index" ON "user" USING btree ("email");