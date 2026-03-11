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

const getSearchStoriesResultCount = (searchTerm: string) => {
  return db
    .select({
      count: count(),
    })
    .from(stories)
    .where(
      sql`(
       setweight(to_tsvector('english', ${stories.title}), 'A') ||
       setweight(to_tsvector('english', ${stories.text}), 'B'))
     @@ websearch_to_tsquery('english',${searchTerm})`
    );
};

const getSearchStoriesResult = ({
  searchTerm,
  page,
  pageSize,
}: SearchStoriesParams) => {
  return db
    .select({
      ...getTableColumns(stories),
    })
    .from(stories)
    .where(
      sql`(
       setweight(to_tsvector('english', ${stories.title}), 'A') ||
       setweight(to_tsvector('english', ${stories.text}), 'B'))
     @@ websearch_to_tsquery('english',${searchTerm})`
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

export const searchStories = async ({
  searchTerm,
  page,
  pageSize,
}: SearchStoriesParams) => {
  try {
    // Join words with OR so any single word matching yields results
    const orSearchTerm = searchTerm.trim().split(/\s+/).join(' or ');

    const query = getSearchStoriesResult({
      searchTerm: orSearchTerm,
      page,
      pageSize,
    });

    const countQuery = getSearchStoriesResultCount(orSearchTerm);

    const [result, [countResult]] = await Promise.all([query, countQuery]);
    const hits = mapSearchDBSearchResultToStoryResult(result);
    return { hits, found: countResult.count };
  } catch (error) {
    console.error(error);
    return { error: '500 Internal Server Error' };
  }
};
