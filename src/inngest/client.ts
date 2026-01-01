import { Inngest } from 'inngest';
import { schemas } from './type';

export const inngest = new Inngest({
  id: 'yai-news',
  schemas,
});
