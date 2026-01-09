export type ItemType = 'comment' | 'story' | 'job' | 'poll' | 'pollopt';

export interface Item {
  id: number;
  by: string;
  title: string;
  type: ItemType;
  kids: number[];
  score: number;
  time: number;
  descendants: number;
  text?: string;
  parent?: number;
  url?: string;
}

export interface ItemComment {
  id: number;
  by: string;
  time: number;
  comments: Array<ItemComment>;
  commentsCount: number;
  parent?: number;
  text?: string;
  kids?: number[];
}

export interface ItemAlgolia {
  id: number;
  created_at: string;
  created_at_i: number;
  type: ItemType;
  title: string;
  url: string;
  text?: string;
  points: number;
  author: string;
  parent_id?: number;
  story_id?: number;
  children: Array<ItemAlgolia>;
  num_comments: number;
}

export interface SearchStoryItem {
  id: number;
  by: string;
  title: string;
  type: ItemType;
  kids: number[];
  score: number;
  time: number;
  descendants: number;
  text?: string;
  parent?: number;
  url?: string;
}

export interface SearchCommentItem {
  id: string;
  createdAt: string;
  createdAtI: number;
  url?: string;
  text?: string;
  points: number;
  author: string;
  parentId?: number;
  updatedAt: string;
  kids: number[];
  storyId: number;
}

export interface SearchResult {
  hits?: ItemAlgolia[];
}

export interface SearchStories {
  query: string;
  page?: number;
  tags?: string[];
}
