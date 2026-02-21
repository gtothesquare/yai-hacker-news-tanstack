import { createServerFn } from '@tanstack/react-start';
import {
  searchStories,
  SearchStoriesParams,
} from '~/features/search/searchStories.server';

export const searchStoriesFn = createServerFn({ method: 'POST' })
  .inputValidator((data: SearchStoriesParams) => data)
  .handler(async ({ data }) => {
    //TODO improve error handling here, searchStories eats it.
    return searchStories(data);
  });
