import { Item, ItemAlgolia } from '~/types';
import { format } from 'timeago.js';

type PickedItem = Pick<Item, 'url' | 'id'>;

export const getStoryUrl = (story?: PickedItem) => {
  if (story) {
    if (story.url) {
      return story.url;
    }

    if (story.id) {
      return `/item/${story.id}`;
    }
  }

  return '';
};

export const getSearchItemUrl = (
  story?: Pick<ItemAlgolia, 'url' | 'story_id'>
) => {
  if (story) {
    if (story.url) {
      return story.url;
    }

    if (story.story_id) {
      return `/item/${story.story_id}`;
    }
  }

  return '';
};

export const getComment = (story?: PickedItem) => {
  if (story) {
    return `/item/${story.id}`;
  }
  return '';
};

export const getSearchComment = (story?: ItemAlgolia) => {
  if (story) {
    return `/item/${story.story_id}`;
  }
  return '';
};

export const getTimeago = (time?: number) => {
  if (time && !isNaN(time)) {
    return format(time * 1000, 'en_US');
  }
  return '';
};

export const getPlace = (page: number, limit: number, index: number) => {
  const offset = (page - 1) * limit;
  return offset + index + 1;
};
