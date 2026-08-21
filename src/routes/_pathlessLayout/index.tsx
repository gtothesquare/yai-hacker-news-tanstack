import { createFileRoute } from '@tanstack/react-router';
import { HNStories } from '~/features/hnstories/HNStories';
import { LIMIT } from '~/config';
import { getTopStories } from '~/features/hnstories/server-functions/getTopStories.functions';
import { StoriesSkeleton } from '~/features/hnstories/StoriesSkeleton';

export const Route = createFileRoute('/_pathlessLayout/')({
  component: Home,
  pendingComponent: StoriesSkeleton,
  loader: () => getTopStories({ data: { page: '1', limit: LIMIT } }),
});

function Home() {
  const stories = Route.useLoaderData();
  return <HNStories page={1} limit={40} stories={stories} />;
}
