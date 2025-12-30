// Create an empty array where we'll export future Inngest functions
import { inngest } from './client';
import { fetchTopStories } from '~/features/hnstories/api';
import { db } from '~/db';
import { stories } from '~/db/schema';

const saveTopStories = inngest.createFunction(
  {
    id: 'saveTopStories',
  },
  { event: 'stories/save.top.stories' },
  async ({ step }) => {
    const topStories = await step.run('fetch-top-stories', async () => {
      const items = await fetchTopStories(0, 400);
      return items;
    });

    await step.run('sync-stories', async () => {
      for (const story of topStories) {
        if (!story) continue;

        await db
          .insert(stories)
          .values({
            id: story.id,
            by: story.by,
            title: story.title,
            url: story.url,
            text: story.text,
            type: story.type,
            score: story.score,
            descendants: story.descendants,
            kids: story.kids,
            time: new Date(story.time * 1000),
          })
          .onConflictDoUpdate({
            target: stories.id,
            set: { score: story.score, descendants: story.descendants },
          });
      }
    });
  }
);

export const functions = [saveTopStories];
