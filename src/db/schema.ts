import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel } from 'drizzle-orm';

export const stories = pgTable('stories', {
  id: integer('id').primaryKey(),
  by: text('by').notNull(),
  title: text('title').notNull(),
  url: text('url'),
  text: text('text'),
  type: text('type').notNull(), // story, job, poll, etc.
  score: integer('score').notNull().default(0),
  descendants: integer('descendants').notNull().default(0), // comment count
  kids: jsonb('kids').$type<number[]>(), // array of comment IDs
  time: timestamp('time').notNull(), // Unix timestamp converted to timestamp
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Story = InferSelectModel<typeof stories>;

export const comments = pgTable('comments', {
  id: integer('id').primaryKey(),
  by: text('by').notNull(),
  parent: integer('parent').notNull(), // parent story or comment ID
  text: text('text'),
  time: timestamp('time').notNull(),
  kids: jsonb('kids').$type<number[]>(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Comment = InferSelectModel<typeof comments>;
