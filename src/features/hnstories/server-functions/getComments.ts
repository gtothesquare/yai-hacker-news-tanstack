import { createServerFn } from '@tanstack/react-start';
import { fetchCommentData } from '~/features/hnstories/api';

export const getComments = createServerFn()
  .validator((data: string) => data)
  .handler(({ data: itemId }) => {
    return fetchCommentData(itemId);
  });
