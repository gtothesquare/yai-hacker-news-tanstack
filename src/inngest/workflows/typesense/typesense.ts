import { inngest } from '~/inngest/client';
import { initializeAllCollections } from '~/lib/typesense/collections';
import { batchSyncDocuments } from '~/lib/typesense/sync';
import {
  commentsQuery,
  newTypesenseSyncQuery,
  storiesQuery,
  updateTypesenseSyncQuery,
} from '~/inngest/workflows/typesense/queries';
import { getLastSync } from '~/inngest/workflows/typesense/helpers';

export const initTypesenseCollections = inngest.createFunction(
  {
    id: 'typesense-init-collections',
  },
  {
    event: 'typesense/init-collections',
  },
  async ({ step }) => {
    await step.run('init-collections', async () => {
      await initializeAllCollections();
    });
  }
);

export const syncTypesenseStoriesDocuments = inngest.createFunction(
  {
    id: 'typesense-sync-top-stories',
  },
  {
    event: 'typesense/sync-collections',
  },
  async ({ step }) => {
    const result = await step.run('sync-top-stories', async () => {
      const lastSync = await getLastSync('stories');
      const documents = await storiesQuery.execute({ lastSync });
      const newSync = await newTypesenseSyncQuery.execute({
        collectionName: 'stories',
      });
      try {
        const total = await batchSyncDocuments('stories', documents);

        return {
          ok: total === documents.length,
          newSyncId: newSync[0].id,
        };
      } catch (_err) {
        return {
          ok: false,
          newSyncId: newSync[0].id,
        };
      }
    });

    await updateTypesenseSyncQuery.execute({
      id: result.newSyncId,
      status: result.ok ? 'completed' : 'failed',
    });
  }
);

export const syncTypesenseCommentsDocuments = inngest.createFunction(
  {
    id: 'typesense-sync-comments',
  },
  {
    event: 'typesense/sync-collections',
  },
  async ({ step }) => {
    const result = await step.run('sync-comments', async () => {
      const lastSync = await getLastSync('comments');
      const documents = await commentsQuery.execute({ lastSync });
      const newSync = await newTypesenseSyncQuery.execute({
        collectionName: 'comments',
      });

      try {
        const total = await batchSyncDocuments('comments', documents);

        return {
          ok: total === documents.length,
          newSyncId: newSync[0].id,
        };
      } catch (_err) {
        return {
          ok: false,
          newSyncId: newSync[0].id,
        };
      }
    });

    await updateTypesenseSyncQuery.execute({
      id: result.newSyncId,
      status: result.ok ? 'completed' : 'failed',
    });
  }
);
