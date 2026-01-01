CREATE TABLE "comments" (
	"id" integer PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"parent_id" integer,
	"story_id" integer,
	"text" text,
	"type" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"created_at_i" integer NOT NULL,
	"updated_at" timestamp NOT NULL,
	"points" integer,
	"kids" integer[] DEFAULT ARRAY[]::integer[]
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" integer PRIMARY KEY NOT NULL,
	"by" text NOT NULL,
	"title" text NOT NULL,
	"url" text,
	"text" text,
	"type" text NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"descendants" integer DEFAULT 0 NOT NULL,
	"kids" integer[] DEFAULT ARRAY[]::integer[],
	"time" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
