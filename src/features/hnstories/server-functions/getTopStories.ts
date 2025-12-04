import { createServerFn } from '@tanstack/react-start';
import { fetchTopStories } from '~/features/hnstories/api';
import { pageStrToNumber } from '~/lib/utils/pageStrToNumber';

export const getTopStories = createServerFn()
  .inputValidator((data: { page: string; limit: number }) => {
    const { limit, page } = data;
    return { page, limit };
  })
  .handler(async ({ data }) => {
    const page = pageStrToNumber(data.page);
    return fetchTopStories(page, data.limit);
  });
