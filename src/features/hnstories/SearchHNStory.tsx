import { Link } from '~/components/ui/Link';
import {
  getComment,
  getSearchComment,
  getStoryUrl,
  getTimeago,
} from '~/features/hnstories/helpers';
import { RouterLink } from '~/components/ui/RouterLink';
import { ItemAlgolia } from '~/types';

interface Props {
  searchItem: ItemAlgolia;
}

export const SearchHNStory = ({ searchItem }: Props) => {
  return (
    <div className="flex space-x-2 font-light">
      <div>
        <div className="flex space-x-2">
          <Link href={getStoryUrl(searchItem)}>{searchItem?.title}</Link>
        </div>
        <div className="flex space-x-1 text-sm text-gray-500">
          <p>
            {searchItem.points} points {searchItem.author}{' '}
            <RouterLink href={getComment(searchItem)}>
              {getTimeago(searchItem.created_at_i)}
            </RouterLink>{' '}
            {searchItem.num_comments > 0 ? (
              <RouterLink href={getSearchComment(searchItem)}>
                {searchItem.num_comments} comments
              </RouterLink>
            ) : (
              'No comments'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
