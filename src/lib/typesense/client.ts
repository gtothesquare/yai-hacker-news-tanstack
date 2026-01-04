import { TYPESENSE_API_KEY, TYPESENSE_URL } from '~/config';

import { Client } from 'typesense';

export const typesenseClient = new Client({
  nodes: [{ url: TYPESENSE_URL }],
  apiKey: TYPESENSE_API_KEY,
});
