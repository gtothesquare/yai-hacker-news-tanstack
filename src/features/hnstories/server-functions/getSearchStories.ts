import { createServerFn } from '@tanstack/react-start';
import { fetchSearchStories } from '~/features/hnstories/api';

export const getSearchStories = createServerFn()
  .validator((data: { query: string; page: number }) => ({
    query: data.query,
    page: data.page,
  }))
  .handler(async ({ data: { query, page } }) => {
    return fetchSearchStories({ query, page });
  });
