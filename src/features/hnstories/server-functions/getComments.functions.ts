import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { fetchCommentData } from '~/features/hnstories/api';

export const getComments = createServerFn()
  .validator(z.number())
  .handler(({ data: itemId }) => {
    return fetchCommentData(itemId);
  });
