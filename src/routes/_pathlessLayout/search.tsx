import { createFileRoute } from '@tanstack/react-router';
import { RouterLink } from '~/components/ui/RouterLink';
import { SearchInput } from '~/components/ui/SearchInput';
import { updateSearchStories } from '~/features/hnstories/server-functions/getSearchStories';
import { LIMIT } from '~/config';
import { SearchStoryResult } from '~/features/search/SearchStoryResult';
import { searchStoriesFn } from '~/features/search/search.functions';

interface QuerySearchParams {
  q: string;
  cursor?: string;
}

export const Route = createFileRoute('/_pathlessLayout/search')({
  server: {},
  component: RouteComponent,
  validateSearch: (search): QuerySearchParams => {
    return {
      q: (search.q as string) ?? '',
      cursor: (search.cursor as string) ?? undefined,
    };
  },
  loaderDeps: ({ search: { cursor, q } }) => ({ cursor, q }),
  loader: async ({ deps: { cursor, q } }) => {
    const result = await searchStoriesFn({
      data: {
        searchTerm: q,
        cursor,
        pageSize: LIMIT,
      },
    });

    return {
      hits: result?.hits ?? [],
      nextCursor: result?.nextCursor,
    };
  },
});

function RouteComponent() {
  const { q } = Route.useSearch();
  const { hits, nextCursor } = Route.useLoaderData();
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
      {q && hits.length === 0 && (
        <p className="p-2 text-sm text-neutral-500">
          No results found for "{q}"
        </p>
      )}
      {hits.map((item) => {
        return <SearchStoryResult key={item.id} story={item} />;
      })}
      {hits.length > 0 && (
        <div className="flex w-full p-2 space-x-6 justify-center">
          {nextCursor && (
            <RouterLink
              to={`/search`}
              search={{
                q,
                cursor: nextCursor,
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
