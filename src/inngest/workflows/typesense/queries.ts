import { db } from '~/db';
import { comments, stories, typesenseSync } from '~/db/schema';
import { sql, gte, and, eq, getTableColumns, Table } from 'drizzle-orm';

const renameId = <T extends Table>(table: T, newName: string) => {
  const { id, ...rest } = getTableColumns(table);
  return { ...rest, [newName]: id };
};

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
  .select(renameId(stories, 'storiesId'))
  .from(stories)
  .where(gte(stories.updatedAt, sql.placeholder('lastSync')))
  .prepare('getStories');

export const commentsQuery = db
  .select(renameId(comments, 'commentId'))
  .from(comments)
  .where(gte(comments.createdAt, sql.placeholder('lastSync')))
  .prepare('getComments');
