ALTER TABLE "user" ADD COLUMN "reset_password_token" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "reset_password_token_expires_at" timestamp (3) with time zone;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "verification_token" varchar(255);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "verification_token_expires_at" timestamp (3) with time zone;