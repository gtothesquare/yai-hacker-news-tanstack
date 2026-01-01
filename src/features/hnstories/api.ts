import { fetchData } from '~/lib/api/fetchData';
import { Item, ItemAlgolia, SearchResult, SearchStories } from '~/types';
import { fetchAlgoliaData } from '~/lib/api/fetchAlgoliaData';

function fulfilled<T>(
  r: PromiseSettledResult<T>
): r is PromiseFulfilledResult<T> {
  return r.status === 'fulfilled';
}

export const fetchCommentData = async (itemId: number) => {
  const item = await fetchData<Item>(`/item/${itemId}`);
  const itemAlgolia = await fetchAlgoliaData<ItemAlgolia>(`/items/${itemId}`);

  return {
    item,
    itemChildren: itemAlgolia.children,
  };
};

export const fetchTopStoriesWithComments = async (
  currentPage: number,
  limit: number
) => {
  const topStories = await fetchData<Array<number>>('topstories');
  const offset = (currentPage - 1) * limit;
  const pageStoryIds = topStories.slice(offset, limit + offset);
  const topStoriesResult = await Promise.allSettled(
    pageStoryIds.map((storyId) => fetchCommentData(storyId))
  );

  const topStoriesData = topStoriesResult.filter(fulfilled).map((r) => r.value);

  return topStoriesData;
};

export const fetchTopStories = async (currentPage: number, limit: number) => {
  const topStories = await fetchData<Array<number>>('topstories');
  const offset = (currentPage - 1) * limit;
  const pageStoryIds = topStories.slice(offset, limit + offset);
  const topStoriesResult = await Promise.allSettled(
    pageStoryIds.map((storyId) => fetchData<Item>(`item/${storyId}`))
  );

  const topStoriesData = topStoriesResult.filter(fulfilled).map((r) => r.value);

  return topStoriesData;
};

export const fetchSearchStories = async ({
  query,
  page = 1,
  tags = ['story', 'show_hn', 'ask_hn', 'front_page'],
}: SearchStories) => {
  if (!query) {
    return [];
  }
  const now = Date.now();
  const tagsParams = tags.join(',');
  const encodedQuery = encodeURIComponent(query);
  const result = await fetchAlgoliaData<SearchResult>(
    `/search_by_date?query=${encodedQuery}&tags=(${tagsParams})&page=${page}&numericFilters=created_at_i<=${now}`
  );
  return result.hits ?? [];
};
