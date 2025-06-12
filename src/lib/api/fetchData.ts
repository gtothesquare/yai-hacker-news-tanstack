import { HACKER_NEWS_API } from '~/config';
import { apiClient } from '~/lib/api/apiClient';

export const fetchData = async <T>(path: string): Promise<T> => {
  return apiClient(`${HACKER_NEWS_API}/${path}.json`);
};
