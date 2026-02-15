import { createFileRoute } from '@tanstack/react-router';
import { RouterLink } from '~/components/ui/RouterLink';
import { SearchInput } from '~/components/ui/SearchInput';
import { updateSearchStories } from '~/features/hnstories/server-functions/getSearchStories';
import { getPlace } from '~/features/hnstories/helpers';
import { LIMIT } from '~/config';
import { SearchStoryResult } from '~/features/search/SearchStoryResult';
import { searchStories } from '~/features/search/searchStories';

interface QuerySearchParams {
  q: string;
  page: number;
}

function getNextSearchPage(currentPage: number) {
  return currentPage + 1;
}

function getPrevSearchPage(currentPage: number) {
  if (currentPage <= 1) {
    return 1;
  }

  return currentPage - 1;
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
    const result = await searchStories({
      searchTerm: q,
      page,
      pageSize: LIMIT,
    });

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
        const place = getPlace(page, LIMIT, i);

        return <SearchStoryResult key={item.id} story={item} place={place} />;
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
