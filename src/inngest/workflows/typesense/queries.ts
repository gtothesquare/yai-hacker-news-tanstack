import { db } from '~/db';
import { comments, stories, typesenseSync } from '~/db/schema';
import { and, eq, getTableColumns, gte, sql } from 'drizzle-orm';

export const lastTypesenseSyncQuery = db
  .select()
  .from(typesenseSync)
  .where(
    and(
      eq(typesenseSync.collectionName, sql.placeholder('collectionName')),
      eq(typesenseSync.status, 'completed')
    )
  )
  .limit(1)
  .prepare('lastTypesenseSync');

export const newTypesenseSyncQuery = db
  .insert(typesenseSync)
  .values({
    collectionName: sql.placeholder('collectionName'),
  })
  .returning();

export const updateTypesenseSyncQuery = db
  .update(typesenseSync)
  .set({
    status: sql`${sql.placeholder('status')}`,
    lastSyncedAt: sql`NOW()`,
  })
  .where(eq(typesenseSync.id, sql.placeholder('id')))
  .prepare('updateSyncQuery');

export const storiesQuery = db
  .select({
    ...getTableColumns(stories),
    id: sql<string>`CAST(${stories.id} AS text)`,
  })
  .from(stories)
  .where(gte(stories.updatedAt, sql.placeholder('lastSync')))
  .prepare('getStories');

export const commentsQuery = db
  .select({
    ...getTableColumns(comments),
    id: sql<string>`CAST(${comments.id} AS text)`,
  })
  .from(comments)
  .where(gte(comments.createdAt, sql.placeholder('lastSync')))
  .prepare('getComments');
