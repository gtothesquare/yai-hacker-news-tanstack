import {
  saveTopStories,
  saveTopStoriesCron,
} from './workflows/syncTopStories/saveTopStories';

export const functions = [saveTopStories, saveTopStoriesCron];
