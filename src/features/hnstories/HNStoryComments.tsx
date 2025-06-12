import { getTimeago } from './helpers';
import { HNStoryComment } from './HNStoryComment';
import { Item, ItemAlgolia } from '~/types';
import { Link } from '~/components/ui/Link';
import { LoadingIndicator } from '~/components/ui/LoadingIndicator';
import { Suspense } from 'react';

interface Props {
  rootItem: Item;
  itemChildren?: ItemAlgolia[];
}

export const HNStoryComments = ({ rootItem, itemChildren }: Props) => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div>
        <div className="flex space-x-2">
          {rootItem?.url && <Link href={rootItem.url}>{rootItem.title}</Link>}
        </div>
        <div className="flex space-x-1 text-sm text-gray-500">
          <p>
            {rootItem.score} points {rootItem?.by} {getTimeago(rootItem?.time)}{' '}
            {rootItem.descendants !== undefined && rootItem.descendants > 0
              ? `${rootItem?.descendants} comments`
              : 'No comments'}
          </p>
        </div>
        {rootItem?.text && (
          <div
            className="text-gray-400 text-sm w-full break-word [&>p]:break-words [&>p]:my-2 [&>pre]:break-words [&>pre]:whitespace-pre-wrap [&>pre]:text-xs [&>pre]:my-2 [&_a]:underline [&_a]:text-sky-500"
            dangerouslySetInnerHTML={{ __html: rootItem.text }}
          />
        )}
        {itemChildren?.map((comment: ItemAlgolia) => (
          <HNStoryComment
            key={`${comment.story_id}-${comment.id}`}
            commentItem={comment}
          />
        ))}
      </div>
    </Suspense>
  );
};
