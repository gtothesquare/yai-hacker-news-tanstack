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
    event: 'typesense/sync-top-stories',
  },
  async ({ step }) => {
    await step.run('sync-top-stories', async () => {
      const lastSync = await getLastSync('stories');
      const documents = await storiesQuery.execute({ lastSync });
      const newSync = await newTypesenseSyncQuery.execute({
        collectionName: 'stories',
      });
      const total = await batchSyncDocuments('stories', documents);
      if (total === documents.length) {
        await updateTypesenseSyncQuery.execute({
          id: newSync[0].id,
          status: 'completed',
        });
      } else {
        await updateTypesenseSyncQuery.execute({
          id: newSync[0].id,
          status: 'failed',
        });
      }
    });
  }
);

export const syncTypesenseCommentsDocuments = inngest.createFunction(
  {
    id: 'typesense-sync-comments',
  },
  {
    event: 'typesense/sync-comments',
  },
  async ({ step }) => {
    await step.run('sync-comments', async () => {
      const lastSync = await getLastSync('comments');
      const documents = await commentsQuery.execute({ lastSync });
      const newSync = await newTypesenseSyncQuery.execute({
        collectionName: 'comments',
      });
      const total = await batchSyncDocuments('comments', documents);
      if (total === documents.length) {
        await updateTypesenseSyncQuery.execute({
          id: newSync[0].id,
          status: 'completed',
        });
      } else {
        await updateTypesenseSyncQuery.execute({
          id: newSync[0].id,
          status: 'failed',
        });
      }
    });
  }
);
