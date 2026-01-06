import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

export const storiesSchema = {
  name: 'stories',
  fields: [
    { name: 'by', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'text', type: 'string', optional: true },
    { name: 'url', type: 'string', optional: true },
    { name: 'createdAt', type: 'string', sort: true },
  ],
  default_sorting_field: 'createdAt',
} as const satisfies CollectionCreateSchema;

export const commentsSchema = {
  name: 'comments',
  fields: [
    {
      name: 'author',
      type: 'string',
      optional: true,
    },
    {
      name: 'text',
      type: 'string',
      optional: true,
    },
    { name: 'createdAt', type: 'string', sort: true },
  ],
} as const satisfies CollectionCreateSchema;

export const schemas = {
  stories: storiesSchema,
  comments: commentsSchema,
} as const;

export type SchemaKey = keyof typeof schemas;
