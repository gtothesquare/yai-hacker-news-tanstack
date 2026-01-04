import { lastTypesenseSyncQuery } from '~/inngest/workflows/typesense/queries';
import { SchemaKey } from '~/lib/typesense/schemas';

export const getLastSync = async (collectionName: SchemaKey) => {
  const result = await lastTypesenseSyncQuery.execute({ collectionName });
  if (result.length === 0) {
    return new Date(0).toISOString();
  }
  return result[0].createdAt;
};
