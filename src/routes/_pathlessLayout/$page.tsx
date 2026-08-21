import { createFileRoute } from '@tanstack/react-router';
import { LIMIT } from '~/config';
import { pageStrToNumber } from '~/lib/utils/pageStrToNumber';
import { HNStories } from '~/features/hnstories/HNStories';
import { getTopStories } from '~/features/hnstories/server-functions/getTopStories.functions';
import { StoriesSkeleton } from '~/features/hnstories/StoriesSkeleton';

export const Route = createFileRoute('/_pathlessLayout/$page')({
  component: PageHome,
  pendingComponent: StoriesSkeleton,
  loader: ({ params: { page } }) =>
    getTopStories({ data: { page, limit: LIMIT } }),
});

function PageHome() {
  const stories = Route.useLoaderData();
  const params = Route.useParams();
  const currentPage = pageStrToNumber(params.page);

  return <HNStories page={currentPage} limit={40} stories={stories} />;
}
