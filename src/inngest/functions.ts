import {
  saveTopStories,
  saveTopStoriesCron,
} from './workflows/syncTopStories/saveTopStories';
import {
  initTypesenseCollections,
  syncTypesenseCommentsDocuments,
  syncTypesenseStoriesDocuments,
} from '~/inngest/workflows/typesense/typesense';

export const functions = [
  saveTopStories,
  saveTopStoriesCron,
  initTypesenseCollections,
  syncTypesenseStoriesDocuments,
  syncTypesenseCommentsDocuments,
];
