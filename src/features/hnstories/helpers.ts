import { Item, ItemAlgolia } from '~/types';

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

export function getTimeago(timestamp: number): string {
  // Convert to milliseconds if timestamp is in seconds
  const date =
    timestamp < 10000000000
      ? new Date(timestamp * 1000) // seconds
      : new Date(timestamp); // milliseconds

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return 'just now';
}

export const getPlace = (page: number, limit: number, index: number) => {
  const offset = (page - 1) * limit;
  return offset + index + 1;
};
