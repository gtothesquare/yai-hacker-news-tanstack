import { Await, createFileRoute } from '@tanstack/react-router';
import { HNStories } from '~/features/hnstories/HNStories';
import { LIMIT } from '~/config';
import { getTopStories } from '~/features/hnstories/server-functions/getTopStories';
import { Suspense } from 'react';
import { StoriesSkeleton } from '~/features/hnstories/StoriesSkeleton';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: Home,
  loader: async () => {
    return {
      deferredStories: getTopStories({ data: { page: '1', limit: LIMIT } }),
    };
  },
});

function Home() {
  const { deferredStories } = Route.useLoaderData();
  return (
    <Suspense fallback={<StoriesSkeleton />}>
      <Await promise={deferredStories}>
        {(stories) => <HNStories page={1} limit={40} stories={stories} />}
      </Await>
    </Suspense>
  );
}
