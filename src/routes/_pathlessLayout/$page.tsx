import { Await, createFileRoute } from '@tanstack/react-router';
import { LIMIT } from '~/config';
import { pageStrToNumber } from '~/lib/utils/pageStrToNumber';
import { HNStories } from '~/features/hnstories/HNStories';
import { getTopStories } from '~/features/hnstories/server-functions/getTopStories';
import { Suspense } from 'react';
import { StoriesSkeleton } from '~/features/hnstories/StoriesSkeleton';

export const Route = createFileRoute('/_pathlessLayout/$page')({
  component: PageHome,
  loader: async ({ params: { page } }) => {
    return {
      deferredStories: getTopStories({ data: { page, limit: LIMIT } }),
    };
  },
});

function PageHome() {
  const { deferredStories } = Route.useLoaderData();
  const params = Route.useParams();
  const currentPage = pageStrToNumber(params.page);

  return (
    <Suspense fallback={<StoriesSkeleton />}>
      <Await promise={deferredStories}>
        {(stories) => (
          <HNStories page={currentPage} limit={40} stories={stories} />
        )}
      </Await>
    </Suspense>
  );
}
