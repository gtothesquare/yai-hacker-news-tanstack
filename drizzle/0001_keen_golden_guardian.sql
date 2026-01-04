CREATE TABLE "typesense_sync" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_name" text NOT NULL,
	"last_synced_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" text DEFAULT 'syncing' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
