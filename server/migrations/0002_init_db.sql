CREATE INDEX IF NOT EXISTS "store_name_index" ON "seller" USING btree ("store_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "store_description_index" ON "seller" USING btree ("store_description");