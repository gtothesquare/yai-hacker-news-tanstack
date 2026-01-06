import { Client } from 'typesense';

const VITE_TYPESENSE_SEARCH_API_KEY = import.meta.env
  .VITE_TYPESENSE_SEARCH_API_KEY!;
const VITE_TYPESENSE_URL = import.meta.env.VITE_TYPESENSE_URL!;

export const searchClient = new Client({
  nodes: [{ url: VITE_TYPESENSE_URL }],
  apiKey: VITE_TYPESENSE_SEARCH_API_KEY,
});
