import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const searchFormSchema = z
  .instanceof(FormData)
  .transform((formData) => formData.get('q'))
  .pipe(z.string().min(1, 'q is required'))
  .transform((query) => ({ query }));

export const updateSearchStories = createServerFn({ method: 'POST' })
  .validator(searchFormSchema)
  .handler(({ data: { query } }) => {
    return new Response('ok', {
      status: 301,
      headers: { Location: `/search?q=${encodeURIComponent(query)}` },
    }) as unknown as string; // hack
  });
