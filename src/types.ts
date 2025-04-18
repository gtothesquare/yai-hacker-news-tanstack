export interface Item {
  id: number;
  by: string;
  title: string;
  type: 'comment' | 'story' | 'job' | 'poll' | 'pollopt';
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
  comments: ItemComment[];
  commentsCount: number;
  parent?: number;
  text?: string;
  kids?: number[];
}

export interface ItemAlgolia {
  id: number;
  created_at: string;
  created_at_i: number;
  type: 'comment' | 'story' | 'job' | 'poll' | 'pollopt';
  title: string;
  url: string;
  text?: string;
  points: number;
  author: string;
  parent_id?: number;
  story_id?: number;
  children: [ItemAlgolia];
  num_comments: number;
}

export interface SearchItem {
  id: number;
  created_at: string;
  created_at_i: number;
  title: string;
  url: string;
  points: number;
  author: string;
  num_comments: number;
  objectID: number;
  relevancy_score: number;
  parent_id?: number;
}

export interface SearchResult {
  hits?: ItemAlgolia[];
}

export interface SearchStories {
  query: string;
  page?: number;
  tags?: string[];
}
