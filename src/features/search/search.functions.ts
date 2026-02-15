import { createServerFn } from '@tanstack/react-start';
import {
  searchStories,
  SearchStoriesParams,
} from '~/features/search/searchStories.server';

export const searchStoriesFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SearchStoriesParams) => data)
  .handler(async ({ data }) => {
    return searchStories(data);
  });
