import { createFileRoute } from '@tanstack/react-router';
import { RouterLink } from '~/components/ui/RouterLink';
import { SearchInput } from '~/components/ui/SearchInput';
import { SearchHNStory } from '~/features/hnstories/SearchHNStory';
import { getSearchStories } from '~/features/hnstories/server-functions/getSearchStories';
import { pageStrToNumber } from '~/lib/utils/pageStrToNumber';

const getNextSearchPage = (currentPage: number) => {
  return currentPage + 1;
};

const getPrevSearchPage = (currentPage: number) => {
  if (currentPage <= 1) {
    return 1;
  }

  return currentPage - 1;
};

export const Route = createFileRoute('/_pathlessLayout/search')({
  component: RouteComponent,
  loaderDeps: ({ search: { page, q } }) => ({ page, q }),
  loader: ({ deps: { page, q } }) => {
    return getSearchStories({ data: { query: q, page } });
  },
});

function RouteComponent() {
  const { page, q } = Route.useSearch();
  const currentPage = pageStrToNumber(page);
  const stories = Route.useLoaderData();
  return (
    <div className="space-y-2">
      <div className="max-w-3xl">
        <SearchInput currentQuery={q} />
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
                page: getPrevSearchPage(currentPage),
              }}
            >
              {'<<'} Prev
            </RouterLink>
          )}
          <RouterLink
            to={`/search`}
            search={{
              q,
              page: getNextSearchPage(currentPage),
            }}
          >
            Next {'>>'}
          </RouterLink>
        </div>
      )}
    </div>
  );
}
