import { EventSchemas } from 'inngest';

type SaveTopStoriesEvent = {
  name: 'stories/save.top.stories';
};

export const schemas = new EventSchemas().fromUnion<SaveTopStoriesEvent>();
