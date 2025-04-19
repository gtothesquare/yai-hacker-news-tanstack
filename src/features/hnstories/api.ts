import { fetchData } from '~/lib/api/fetchData';
import { Item, ItemAlgolia, SearchResult, SearchStories } from '~/types';
import { fetchAlgoliaData } from '~/lib/api/fetchAlgoliaData';

export const fetchCommentData = async (itemId: string) => {
  const item = await fetchData<Item>(`/item/${itemId}`);
  const { children } = await fetchAlgoliaData<ItemAlgolia>(`/items/${itemId}`);

  return {
    item,
    itemChildren: children,
  };
};

export const fetchTopStories = async (currentPage: number, limit: number) => {
  const topStories = await fetchData<Array<number>>('topstories');
  const offset = (currentPage - 1) * limit;
  const pageStoryIds = topStories.slice(offset, limit + offset);
  return await Promise.all(
    pageStoryIds.map((storyId) => fetchData<Item>(`item/${storyId}`))
  );
};

export const fetchSearchStories = async ({
  query,
  page = 1,
  tags = ['story'],
}: SearchStories) => {
  if (!query) {
    return [];
  }
  const tagsParams = tags.join(',');
  const encodedQuery = encodeURIComponent(query);
  const result = await fetchAlgoliaData<SearchResult>(
    `/search?query=${encodedQuery}&tags=${tagsParams}&page=${page}`
  );
  return result.hits ?? [];
};
