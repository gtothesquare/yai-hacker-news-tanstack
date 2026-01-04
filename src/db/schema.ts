import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel, sql } from 'drizzle-orm';
import { ItemType } from '~/types';

export const stories = pgTable('stories', {
  id: integer('id').primaryKey(),
  by: text('by').notNull(),
  title: text('title').notNull(),
  url: text('url'),
  text: text('text'),
  type: text('type').$type<ItemType>().notNull(), // story, job, poll, etc.
  score: integer('score').notNull().default(0),
  descendants: integer('descendants').notNull().default(0),
  kids: integer('kids')
    .array()
    .default(sql`ARRAY[]::integer[]`),
  time: timestamp('time').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Story = InferSelectModel<typeof stories>;

export const comments = pgTable('comments', {
  id: integer('id').primaryKey().notNull(),
  author: text('author'),
  parentId: integer('parent_id'),
  storyId: integer('story_id'),
  text: text('text'),
  type: text('type').$type<ItemType>().notNull(),
  createdAt: timestamp('created_at').notNull(),
  createdAtI: integer('created_at_i').notNull(),
  // unix timestamp
  updatedAt: timestamp('updated_at').notNull(),
  points: integer('points'),
  kids: integer('kids')
    .array()
    .default(sql`ARRAY[]::integer[]`),
});

export type Comment = InferSelectModel<typeof comments>;

export const typesenseSync = pgTable('typesense_sync', {
  id: serial('id').primaryKey(),
  collectionName: text('collection_name').notNull(),
  lastSyncedAt: timestamp('last_synced_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  status: text('status', {
    enum: ['syncing', 'completed', 'failed'],
  })
    .notNull()
    .default('syncing'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TypesenseSync = InferSelectModel<typeof typesenseSync>;
export type NewTypesenseSync = InferInsertModel<typeof typesenseSync>;
