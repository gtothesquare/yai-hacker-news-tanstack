CREATE EXTENSION IF NOT EXISTS pg_trgm; --added manually
CREATE INDEX "stories_title_trgm_idx" ON "stories" USING gin ("title" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "stories_text_trgm_idx" ON "stories" USING gin ("text" gin_trgm_ops);