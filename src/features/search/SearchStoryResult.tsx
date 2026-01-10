import { SearchStoryItem } from '~/types';
import { Link } from '~/components/ui/Link';

import { getComment, getStoryUrl, getTimeago } from '../hnstories/helpers';
import { RouterLink } from '~/components/ui/RouterLink';

interface Props {
  story: SearchStoryItem;
  place: number;
}

export const SearchStoryResult = ({ story, place }: Props) => {
  return (
    <div className="flex space-x-2 font-light">
      <div className="text-gray-500">{place}.</div>
      <div>
        <div className="flex space-x-2">
          <Link href={getStoryUrl(story)}>{story?.title}</Link>
        </div>
        <div className="flex space-x-1 text-sm text-gray-500">
          <p>
            {story.score} points {story.by}{' '}
            <RouterLink href={getComment(story)} preload={'intent'}>
              {getTimeago(story.time)}
            </RouterLink>{' '}
            {story.descendants > 0 ? (
              <RouterLink href={getComment(story)} preload={'intent'}>
                {story.descendants} comments
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
