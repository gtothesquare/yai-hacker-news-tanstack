import { count, getTableColumns, sql } from 'drizzle-orm';
import { stories } from '~/db/schema';
import { db } from '~/db';

export interface SearchStoriesParams {
  searchTerm: string;
  page: number;
  pageSize: number;
}

export type DBSearchResult = Awaited<ReturnType<typeof getSearchStoriesResult>>;

const mapSearchDBSearchResultToStoryResult = (result: DBSearchResult) => {
  return result.map((doc) => {
    return {
      ...doc,
      url: doc.url ?? undefined,
      text: doc.text ?? undefined,
      kids: doc.kids ?? [],
      time: doc.time.getTime() / 1000,
    };
  });
};

const searchVector = sql`
    setweight(to_tsvector('english', ${stories.title}), 'A')
`;

const getSearchMatch = (searchTerm: string) =>
  sql`(
      setweight(to_tsvector('english', ${stories.title}), 'A')
    ) @@ websearch_to_tsquery('english', ${searchTerm})`;

const getSearchQuery = (searchTerm: string) => {
  return sql`websearch_to_tsquery('english', ${searchTerm})`;
};

const getSearchRank = (searchTerm: string) =>
  sql<number>`ts_rank(${searchVector}, ${getSearchQuery(searchTerm)})`;

const getSearchStoriesResultCount = (searchTerm: string) => {
  return db
    .select({
      count: count(),
    })
    .from(stories)
    .where(getSearchMatch(searchTerm));
};

const getSearchStoriesResult = ({
  searchTerm,
  page,
  pageSize,
}: SearchStoriesParams) => {
  return db
    .select({
      ...getTableColumns(stories),
      rank: getSearchRank(searchTerm).as('rank'),
    })
    .from(stories)
    .where(getSearchMatch(searchTerm))
    .orderBy(sql`${getSearchRank(searchTerm)} DESC`, sql`${stories.time} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

export const searchStories = async ({
  searchTerm,
  page,
  pageSize,
}: SearchStoriesParams) => {
  try {
    const query = getSearchStoriesResult({
      searchTerm,
      page,
      pageSize,
    });

    const countQuery = getSearchStoriesResultCount(searchTerm);

    const [result, [countResult]] = await Promise.all([query, countQuery]);
    const hits = mapSearchDBSearchResultToStoryResult(result);
    return { hits, found: countResult.count };
  } catch (error) {
    console.error(error);
    return { error: '500 Internal Server Error' };
  }
};
