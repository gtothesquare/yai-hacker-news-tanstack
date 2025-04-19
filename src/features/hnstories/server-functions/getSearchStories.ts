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

export const updateSearchStories = createServerFn({ method: 'POST' })
  .validator((formData: FormData) => {
    if (!(formData instanceof FormData)) {
      throw new Error('Invalid form data');
    }

    const query = formData.get('q') as string;

    if (!query) {
      throw new Error('q is required');
    }

    return { query };
  })
  .handler(({ data: { query } }) => {
    return new Response('ok', {
      status: 301,
      headers: { Location: `/search?q=${encodeURIComponent(query)}` },
    }) as unknown as string; // hack
  });
