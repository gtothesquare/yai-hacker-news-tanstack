import { Item } from '~/types';
import { Alert } from '~/components/ui/Alert';
import { Link } from '~/components/ui/Link';

import { getComment, getTimeago, getStoryUrl } from './helpers';
import { RouterLink } from '~/components/ui/RouterLink';

interface Props {
  story: Item;
  place: number;
}

/*
* {
  by: 'jkurnia',
  descendants: 2,
  id: 36837512,
  kids: [ 36838886, 36838823 ],
  score: 10,
  text: 'Hi everyone,<p>Great Books Homeschool has just released this free tool for generating high school transcripts using the standard American unweighted GPA system.  It&#x27;s available to the public at no cost, and no account creation is required.<p>These are both resources that would have saved me time as a new homeschooling parent, and I hope they are helpful to others.<p>StoryComments and feedback are welcome!',
  time: 1690133187,
  title: 'Show HN: High school transcript generator for homeschoolers',
  type: 'story',
  url: 'https://www.greatbookshomeschool.com/free-high-school-transcript-generator'
}
* */

export const HNStory = ({ story, place }: Props) => {
  if (!story) return <Alert title="Failed to fetch story" />;
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
