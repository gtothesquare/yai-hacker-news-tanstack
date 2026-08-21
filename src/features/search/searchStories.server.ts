import { getTableColumns, sql } from 'drizzle-orm';
import { stories } from '~/db/schema';
import { db } from '~/db';

export interface SearchStoriesParamsV2 {
  searchTerm: string;
  pageSize: number;
  cursor?: { score: number; id: number }; // from last item of previous page
}

export type DBSearchResultV2 = Awaited<
  ReturnType<typeof searchStoriesCombined>
>;

//legacy when playing with typesense
const mapSearchDBSearchResultToStoryResult = (result: DBSearchResultV2) => {
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

/**
 * combine free text search with similarity of text using trigram matching
 */
const searchStoriesCombined = async ({
  searchTerm,
  pageSize,
  cursor, // from last item of previous page
}: SearchStoriesParamsV2) => {
  /**
   * The % operator is pg_trgm's similarity threshold operator. It's shorthand for:
   * sql
   *
   * similarity(stories.title, searchTerm) >= pg_trgm.similarity_threshold
   *
   *
   *  concatenate title with text  in to_tsvector('english', ${stories.title} || ' ' || coalesce(${stories.text}, '')
   * coalesce(text, '')	Guard against NULL text breaking the concatenation
   */
  const baseWhere = sql`(
    ${stories.title} % ${searchTerm}
    OR ${stories.text} % ${searchTerm}
    OR to_tsvector('english', ${stories.title} || ' ' || coalesce(${stories.text}, ''))
        @@ plainto_tsquery('english', ${searchTerm})
  )`;

  //get score of free search and trigram and favors trigram
  const combinedScore = sql<number>`(
    GREATEST(
      similarity(${stories.title}, ${searchTerm}),
      similarity(coalesce(${stories.text}, ''), ${searchTerm})
    ) * 0.6
    +
    ts_rank(
      to_tsvector('english', ${stories.title} || ' ' || coalesce(${stories.text}, '')),
      plainto_tsquery('english', ${searchTerm})
    ) * 0.4
  )`;

  return await db
    .select({
      ...getTableColumns(stories),
      id: stories.id,
      title: stories.title,
      by: stories.by,
      score: stories.score,
      combinedScore, // so client can pass it back
    })
    .from(stories)
    .where(
      cursor
        ? sql`(${baseWhere}) AND (${combinedScore} < ${cursor.score}
               OR (${combinedScore} = ${cursor.score} AND ${stories.id} > ${cursor.id}))`
        : baseWhere
    )
    .orderBy(sql`(${combinedScore}) DESC, ${stories.id} ASC`)
    .limit(pageSize + 1);
};

function encodeCursor(score: number, id: number): string {
  return Buffer.from(`${score}|${id}`).toString('base64');
}

function decodeCursor(cursor: string): { score: number; id: number } {
  const [score, id] = Buffer.from(cursor, 'base64').toString().split('|');
  return { score: parseFloat(score), id: parseInt(id) };
}

export const searchStories = async ({
  searchTerm,
  cursor,
  pageSize,
}: {
  searchTerm: string;
  cursor: string | undefined;
  pageSize: number;
}) => {
  try {
    const cursorData = cursor ? decodeCursor(cursor) : undefined;
    const result = await searchStoriesCombined({
      searchTerm,
      pageSize,
      cursor: cursorData,
    });
    const hasMore = result.length > pageSize;
    const resultPaged = result.slice(0, pageSize);
    const lastItem = resultPaged.at(-1);

    const hits = mapSearchDBSearchResultToStoryResult(resultPaged);

    const nextCursor =
      hasMore && lastItem
        ? encodeCursor(lastItem.combinedScore, lastItem.id)
        : undefined;
    return { hits, nextCursor };
  } catch (error) {
    console.error(error);
    return { error: '500 Internal Server Error' };
  }
};
