import { createFileRoute } from '@tanstack/react-router';
import { getComments } from '~/features/hnstories/server-functions/getComments.functions';
import { HNStoryComments } from '~/features/hnstories/HNStoryComments';
import { LoadingIndicator } from '~/components/ui/LoadingIndicator';
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
  pendingComponent: LoadingIndicator,
  component: RouteComponent,
  loader: ({ params: { id } }) => getComments({ data: id }),
});

function RouteComponent() {
  const commentData = Route.useLoaderData();
  return (
    <HNStoryComments
      rootItem={commentData.item}
      itemChildren={commentData.itemChildren}
    />
  );
}
