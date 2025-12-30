import { fetchData } from '~/lib/api/fetchData';
import { Item, ItemAlgolia, SearchResult, SearchStories } from '~/types';
import { fetchAlgoliaData } from '~/lib/api/fetchAlgoliaData';

export const fetchCommentData = async (itemId: string) => {
  const item = await fetchData<Item>(`/item/${itemId}`);
  const itemAlgolia = await fetchAlgoliaData<ItemAlgolia>(`/items/${itemId}`);

  return {
    item,
    itemChildren: itemAlgolia.children,
  };
};

export const fetchTopStories = async (currentPage: number, limit: number) => {
  const topStories = await fetchData<Array<number>>('topstories');
  const offset = (currentPage - 1) * limit;
  const pageStoryIds = topStories.slice(offset, limit + offset);
  const topStoriesData = await Promise.all(
    pageStoryIds.map((storyId) => fetchData<Item>(`item/${storyId}`))
  );

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
