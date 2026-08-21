import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { fetchTopStories } from '~/features/hnstories/api';
import { pageStrToNumber } from '~/lib/utils/pageStrToNumber';

const topStoriesSchema = z.object({
  page: z.string(),
  limit: z.number(),
});

export const getTopStories = createServerFn()
  .validator(topStoriesSchema)
  .handler(async ({ data }) => {
    const page = pageStrToNumber(data.page);
    return fetchTopStories(page, data.limit);
  });
