import { eventType } from 'inngest';

export const saveTopStoriesEvent = eventType('stories/save.top.stories');

export const initTypesenseCollectionsEvent = eventType(
  'typesense/init-collections'
);

export const syncTypesenseCollectionsEvent = eventType(
  'typesense/sync-collections'
);
