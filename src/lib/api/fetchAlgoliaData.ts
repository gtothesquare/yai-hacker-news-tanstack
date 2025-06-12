import { HACKER_NEWS_ALGOLIA_API } from '~/config';
import { apiClient } from '~/lib/api/apiClient';

export const fetchAlgoliaData = async <T>(path: string): Promise<T> => {
  return apiClient(`${HACKER_NEWS_ALGOLIA_API}${path}`);
};
