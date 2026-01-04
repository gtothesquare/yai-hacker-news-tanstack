import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

export const storiesSchema = {
  name: 'stories',
  fields: [
    { name: 'id', type: 'int32' },
    { name: 'by', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'text', type: 'string' },
    { name: 'url', type: 'string' },
  ],
  default_sorting_field: 'created_at',
} as const satisfies CollectionCreateSchema;

export const commentsSchema = {
  name: 'comments',
  fields: [
    {
      name: 'id',
      type: 'int32',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'author',
      type: 'string',
    },
    {
      name: 'text',
      type: 'string',
    },
  ],
} as const satisfies CollectionCreateSchema;

export const schemas = {
  stories: storiesSchema,
  comments: commentsSchema,
} as const;

export type SchemaKey = keyof typeof schemas;
