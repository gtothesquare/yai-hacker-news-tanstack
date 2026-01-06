import { ItemAlgolia } from '~/types';
import { format } from 'timeago.js';
import { RouterLink } from '~/components/ui/RouterLink';

interface Props {
  commentItem: Omit<ItemAlgolia, 'children'>;
  place: number;
}

export const SearchCommentResult = ({ commentItem, place }: Props) => {
  const { author, created_at_i, parent_id, text } = commentItem;
  return (
    <div className="flex space-x-2">
      <div className="font-light text-gray-500">{place}.</div>
      <div className="flex flex-col text-xs md:text-sm">
        <div className="text-gray-500 flex space-x-1 pt-4 pb-0.5">
          <p>
            {author} {format(created_at_i * 1000)} |{' '}
            {parent_id ? (
              <RouterLink href={`#${parent_id}`}>parent</RouterLink>
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
