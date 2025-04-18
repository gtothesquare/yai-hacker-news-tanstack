import { Await, createFileRoute } from '@tanstack/react-router';
import { getComments } from '~/features/hnstories/server-functions/getComments';
import { HNStoryComments } from '~/features/hnstories/HNStoryComments';
import { LoadingIndicator } from '~/components/ui/LoadingIndicator';
import { Suspense } from 'react';

export const Route = createFileRoute('/_pathlessLayout/item/$id')({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    return { deferredComments: getComments({ data: id }) };
  },
});

function RouteComponent() {
  const { deferredComments } = Route.useLoaderData();
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Await promise={deferredComments}>
        {(commentData) => (
          <HNStoryComments
            rootItem={commentData.item}
            itemChildren={commentData.itemChildren}
          />
        )}
      </Await>
    </Suspense>
  );
}
