import { ItemAlgolia } from '~/types';

export const extractChildIds = (comment: ItemAlgolia): number[] => {
  return comment.children?.map((c) => c.id) || [];
};

// Flatten nested comments for insertion
export const flattenComments = (comments: ItemAlgolia[]): ItemAlgolia[] => {
  const flattened: ItemAlgolia[] = [];

  const traverse = (commentList: ItemAlgolia[]) => {
    for (const comment of commentList) {
      flattened.push(comment);
      if (comment.children?.length > 0) {
        traverse(comment.children);
      }
    }
  };

  traverse(comments);
  return flattened;
};
