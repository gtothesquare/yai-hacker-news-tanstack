import { HNStory } from '~/features/hnstories/HNStory';
import { Item } from '~/types';
import { getPlace } from '~/features/hnstories/helpers';
import { RouterLink } from '~/components/ui/RouterLink';

interface Props {
  page: number;
  limit: number;
  stories: Item[];
}

export const HNStories = ({ stories, page, limit }: Props) => {
  return (
    <div>
      {stories.map((story, index) => (
        <HNStory
          key={story.id}
          story={story}
          place={getPlace(page, limit, index)}
        />
      ))}
      <div className="pt-4 w-full text-center">
        <RouterLink
          to={`/$page`}
          params={{ page: `${page + 1}` }}
          preload={'viewport'}
        >
          More
        </RouterLink>
      </div>
    </div>
  );
};
