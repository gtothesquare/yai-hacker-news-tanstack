import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { searchStories } from '~/features/search/searchStories.server';

const searchStoriesSchema = z
  .object({
    searchTerm: z.string(),
    cursor: z.string().optional(),
    pageSize: z.number(),
  })
  .transform(({ cursor, pageSize, searchTerm }) => ({
    searchTerm,
    cursor,
    pageSize,
  }));

export const searchStoriesFn = createServerFn({ method: 'POST' })
  .validator(searchStoriesSchema)
  .handler(async ({ data }) => {
    //TODO improve error handling here, searchStories eats it.
    return searchStories(data);
  });
