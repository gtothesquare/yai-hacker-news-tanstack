import { EventSchemas } from 'inngest';

type SaveTopStoriesEvent = {
  name: 'stories/save.top.stories';
};

type InitializeTypesenseCollectionsEvent = {
  name: 'typesense/init-collections';
};

type SyncCollectionsEvent = {
  name: 'typesense/sync-collections';
};

export const schemas = new EventSchemas().fromUnion<
  | SaveTopStoriesEvent
  | InitializeTypesenseCollectionsEvent
  | SyncCollectionsEvent
>();
