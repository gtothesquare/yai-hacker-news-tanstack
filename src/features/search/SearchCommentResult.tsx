import { SearchCommentItem } from '~/types';
import { RouterLink } from '~/components/ui/RouterLink';
import { getTimeago } from '~/features/hnstories/helpers';

interface Props {
  commentItem: SearchCommentItem;
  place: number;
}

export const SearchCommentResult = ({ commentItem, place }: Props) => {
  const { author, createdAtI, parentId, storyId, text } = commentItem;

  return (
    <div className="flex space-x-2">
      <div className="font-light text-gray-500">{place}.</div>
      <div className="flex flex-col text-xs md:text-sm">
        <div className="text-gray-500 flex space-x-1 pb-0.5">
          <p>
            {author} {getTimeago(createdAtI * 1000)}
            {parentId ? (
              <>
                {' '}
                |{' '}
                <RouterLink href={`/item/${storyId}#${parentId}`}>
                  parent
                </RouterLink>
              </>
            ) : null}
            {storyId ? (
              <>
                {' '}
                | <RouterLink href={`/item/${storyId}`}>story </RouterLink>
              </>
            ) : null}
          </p>
        </div>
        {text && (
          <div
            className="w-full break-word [&>p]:break-words [&>p]:my-2 [&>pre]:break-words [&>pre]:whitespace-pre-wrap [&>pre]:text-xs [&>pre]:my-2 [&_a]:underline [&_a]:text-sky-500"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  );
};
