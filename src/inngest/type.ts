import { EventSchemas } from 'inngest';

type SaveTopStoriesEvent = {
  name: 'stories/save.top.stories';
};

type InitializeTypesenseCollectionsEvent = {
  name: 'typesense/init-collections';
};

type SyncTopStoriesEvent = {
  name: 'typesense/sync-top-stories';
};

type SyncCommentsEvent = {
  name: 'typesense/sync-comments';
};

export const schemas = new EventSchemas().fromUnion<
  | SaveTopStoriesEvent
  | InitializeTypesenseCollectionsEvent
  | SyncTopStoriesEvent
  | SyncCommentsEvent
>();
