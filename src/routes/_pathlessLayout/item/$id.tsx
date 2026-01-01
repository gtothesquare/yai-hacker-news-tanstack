import { Await, createFileRoute } from '@tanstack/react-router';
import { getComments } from '~/features/hnstories/server-functions/getComments';
import { HNStoryComments } from '~/features/hnstories/HNStoryComments';
import { LoadingIndicator } from '~/components/ui/LoadingIndicator';
import { Suspense } from 'react';
import { z } from 'zod';

export const Route = createFileRoute('/_pathlessLayout/item/$id')({
  params: {
    parse: (params) => ({
      id: z.coerce.number().parse(params.id),
    }),
    stringify: (params) => ({
      id: String(params.id),
    }),
  },
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
