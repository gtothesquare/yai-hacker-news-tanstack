import { db } from '~/db';
import { comments, stories } from '~/db/schema';
import { Item, ItemAlgolia } from '~/types';
import { sql } from 'drizzle-orm';
import { extractChildIds } from './helpers';

export const upsertStory = async (story: Item) => {
  await db
    .insert(stories)
    .values({
      id: story.id,
      by: story.by,
      title: story.title,
      url: story.url,
      text: story.text,
      type: story.type,
      score: story.score,
      descendants: story.descendants,
      kids: story.kids,
      time: new Date(story.time * 1000),
    })
    .onConflictDoUpdate({
      target: stories.id,
      set: {
        score: story.score,
        descendants: story.descendants,
        updatedAt: sql`NOW()`,
      },
    });
};

export const upsertComment = async (comment: ItemAlgolia) => {
  await db
    .insert(comments)
    .values({
      id: comment.id,
      author: comment.author,
      parentId: comment.parent_id,
      storyId: comment.story_id,
      text: comment.text,
      type: comment.type,
      createdAt: new Date(comment.created_at),
      createdAtI: comment.created_at_i,
      updatedAt: new Date(comment.created_at),
      points: comment.points,
      kids: extractChildIds(comment), // Just the IDs
    })
    .onConflictDoUpdate({
      target: comments.id,
      set: {
        text: comment.text,
        points: comment.points,
        kids: extractChildIds(comment),
        updatedAt: sql`NOW()`,
      },
    });
};
