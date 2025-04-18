import { HACKER_NEWS_ALGOLIA_API } from '~/config';

export const fetchAlgoliaData = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${HACKER_NEWS_ALGOLIA_API}${path}`);

  if (res.status !== 200) {
    throw new Error(`Status ${res.status}`);
  }
  return res.json();
};
