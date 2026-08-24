import { Item, ItemAlgolia, ItemComment } from '~/types';
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

export const transformFirebaseComment = (
  comment: ItemComment,
  storyId: number
): ItemAlgolia => {
  const children = comment.comments.map((child) =>
    transformFirebaseComment(child, storyId)
  );

  return {
    id: comment.id,
    created_at: new Date(comment.time * 1000).toISOString(),
    created_at_i: comment.time,
    type: 'comment',
    title: '',
    url: '',
    text: comment.text,
    points: 0,
    author: comment.by,
    parent_id: comment.parent,
    story_id: storyId,
    children,
    num_comments: children.reduce(
      (total, child) => total + child.num_comments + 1,
      0
    ),
  };
};

export const fetchCommentKids = async (
  commentsIds: number[],
  storyId: number
): Promise<ItemAlgolia[]> => {
  const comments = await fetchComments(commentsIds);
  return comments.map((comment) => transformFirebaseComment(comment, storyId));
};
