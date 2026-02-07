import { createFileRoute } from '@tanstack/react-router';
import { RouterLink } from '~/components/ui/RouterLink';
import { SearchInput } from '~/components/ui/SearchInput';
import { updateSearchStories } from '~/features/hnstories/server-functions/getSearchStories';
import { SearchCommentItem, SearchStoryItem } from '~/types';
import { getPlace } from '~/features/hnstories/helpers';
import { searchClient } from '~/features/search/searchClient';
import { SearchCommentResult } from '~/features/search/SearchCommentResult';
import { LIMIT } from '~/config';
import { SearchStoryResult } from '~/features/search/SearchStoryResult';

interface QuerySearchParams {
  q: string;
  page: number;
}

type SearchResult = SearchStoryItem | SearchCommentItem;

function getNextSearchPage(currentPage: number) {
  return currentPage + 1;
}

function getPrevSearchPage(currentPage: number) {
  if (currentPage <= 1) {
    return 1;
  }

  return currentPage - 1;
}

function isStory(doc: SearchResult): doc is SearchStoryItem {
  return 'title' in doc;
}

export const Route = createFileRoute('/_pathlessLayout/search')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): QuerySearchParams => {
    return {
      q: (search.q as string) ?? '',
      page: Number(search?.page ?? 1),
    };
  },
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: async ({ deps: { page, q } }) => {
    const result = await searchClient.multiSearch.perform<SearchResult[]>(
      {
        union: true,
        searches: [
          {
            collection: 'stories',
            q,
            query_by: 'title,text,url,by',
            sort_by: '_text_match:desc',
          },
          {
            collection: 'comments',
            q,
            query_by: 'author,text',
            sort_by: '_text_match:desc',
          },
        ],
      },
      {
        per_page: LIMIT,
        page,
      }
    );

    return {
      hits: result.hits ?? [],
      found: result.found,
    };
  },
});

function RouteComponent() {
  const { page, q } = Route.useSearch();
  const { hits, found } = Route.useLoaderData();
  return (
    <div className="space-y-2">
      <div className="max-w-3xl">
        <SearchInput
          currentQuery={q}
          url={updateSearchStories.url}
          method={'POST'}
          encType="multipart/form-data"
        />
      </div>
      {hits.map((item, i) => {
        const doc = item.document;
        const place = getPlace(page, LIMIT, i);
        if (isStory(doc)) {
          return <SearchStoryResult key={doc.id} story={doc} place={place} />;
        }
        return (
          <SearchCommentResult commentItem={doc} place={place} key={doc.id} />
        );
      })}
      {hits.length > 0 && (
        <div className="flex w-full p-2 space-x-6 justify-center">
          {page > 1 && (
            <RouterLink
              to={`/search`}
              search={{
                q,
                page: getPrevSearchPage(page),
              }}
            >
              {'<<'} Prev
            </RouterLink>
          )}
          {found > LIMIT && (
            <RouterLink
              to={`/search`}
              search={{
                q,
                page: getNextSearchPage(page),
              }}
            >
              Next {'>>'}
            </RouterLink>
          )}
        </div>
      )}
    </div>
  );
}
