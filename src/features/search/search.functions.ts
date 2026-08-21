import { createServerFn } from '@tanstack/react-start';
import { searchStories } from '~/features/search/searchStories.server';

export const searchStoriesFn = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      searchTerm: string;
      cursor: string | undefined;
      pageSize: number;
    }) => data
  )
  .handler(async ({ data }) => {
    //TODO improve error handling here, searchStories eats it.
    return searchStories(data);
  });
