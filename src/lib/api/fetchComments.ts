import { Item, ItemComment } from '~/types';
import { fetchData } from './fetchData';

export const fetchComments = async (
  commentsIds: number[]
): Promise<ItemComment[]> => {
  return Promise.all(
    commentsIds.map(async (commentId) => {
      const comment = await fetchData<Item>(`/item/${commentId}`);
      return {
        id: comment.id,
        by: comment.by,
        text: comment.text,
        time: comment.time,
        parent: comment.parent,
        comments: await fetchComments(comment.kids || []),
        commentsCount: comment.descendants || 0,
      };
    })
  );
};
