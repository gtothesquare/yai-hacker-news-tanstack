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
     @@ to_tsquery('english',${searchTerm})`
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
     @@ to_tsquery('english',${searchTerm})`
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
    // const matchQuery = sql`(
    // setweight(to_tsvector('english', ${stories.title}), 'A') ||
    // setweight(to_tsvector('english', ${stories.text}), 'B')), to_tsquery('english', ${searchTerm})`;

    const query = getSearchStoriesResult({ searchTerm, page, pageSize });

    const countQuery = getSearchStoriesResultCount(searchTerm);

    const [result, [countResult]] = await Promise.all([query, countQuery]);
    const hits = mapSearchDBSearchResultToStoryResult(result);
    return { hits, found: countResult.count };
  } catch (error) {
    console.error(error);
    return { error: '500 Internal Server Error' };
  }
};
