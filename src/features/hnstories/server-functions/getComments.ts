import { createServerFn } from '@tanstack/react-start';
import { fetchCommentData } from '~/features/hnstories/api';

export const getComments = createServerFn()
  .inputValidator((data: string) => data)
  .handler(({ data: itemId }) => {
    return fetchCommentData(itemId);
  });
