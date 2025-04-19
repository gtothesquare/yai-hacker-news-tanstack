import { createFileRoute } from '@tanstack/react-router';
import { RouterLink } from '~/components/ui/RouterLink';
import { SearchInput } from '~/components/ui/SearchInput';
import { SearchHNStory } from '~/features/hnstories/SearchHNStory';
import {
  getSearchStories,
  updateSearchStories,
} from '~/features/hnstories/server-functions/getSearchStories';

const getNextSearchPage = (currentPage: number) => {
  return currentPage + 1;
};

const getPrevSearchPage = (currentPage: number) => {
  if (currentPage <= 1) {
    return 1;
  }

  return currentPage - 1;
};

interface QuerySerachParams {
  q: string;
  page: number;
}

export const Route = createFileRoute('/_pathlessLayout/search')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): QuerySerachParams => {
    return {
      q: (search.q as string) ?? '',
      page: Number(search?.page ?? 1),
    };
  },
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: ({ deps: { page, q } }) => {
    return getSearchStories({ data: { query: q, page } });
  },
});

function RouteComponent() {
  const { page, q } = Route.useSearch();
  const stories = Route.useLoaderData();
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
      {stories.map((item) => (
        <SearchHNStory key={item.story_id} searchItem={item} />
      ))}
      {stories.length > 0 && (
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
          <RouterLink
            to={`/search`}
            search={{
              q,
              page: getNextSearchPage(page),
            }}
          >
            Next {'>>'}
          </RouterLink>
        </div>
      )}
    </div>
  );
}
