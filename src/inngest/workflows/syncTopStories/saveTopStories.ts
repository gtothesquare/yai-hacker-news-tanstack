import { inngest } from '../../client';
import { fetchTopStoriesWithComments } from '~/features/hnstories/api';
import { flattenComments } from '~/inngest/workflows/syncTopStories/helpers';
import {
  upsertComment,
  upsertStory,
} from '~/inngest/workflows/syncTopStories/queries';

export const saveTopStories = inngest.createFunction(
  {
    id: 'save-top-stories-event',
  },
  { event: 'stories/save.top.stories' },
  async ({ step }) => {
    await step.run('sync-top-stories', async () => {
      const topStories = await fetchTopStoriesWithComments(1, 400);
      for (const itemData of topStories) {
        const story = itemData.item;
        if (!story) continue;

        await upsertStory(story);

        // Flatten and insert all comments
        const allComments = flattenComments(itemData.itemChildren);

        for (const comment of allComments) {
          await upsertComment(comment);
        }
      }
    });
  }
);

export const saveTopStoriesCron = inngest.createFunction(
  {
    id: 'save-top-stories-every-30-minutes',
  },
  { cron: '*/30 * * * *' },
  async ({ step }) => {
    await step.run('sync-top-stories', async () => {
      const topStories = await fetchTopStoriesWithComments(1, 400);
      for (const itemData of topStories) {
        const story = itemData.item;
        if (!story) continue;

        await upsertStory(story);

        // Flatten and insert all comments
        const allComments = flattenComments(itemData.itemChildren);

        for (const comment of allComments) {
          await upsertComment(comment);
        }
      }
    });
  }
);
