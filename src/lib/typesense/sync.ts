import { typesenseClient } from './client';

type SyncOperation = 'upsert' | 'create' | 'update' | 'delete';

export async function syncDocument<T extends Record<string, string>>(
  collectionName: string,
  document: T,
  operation: SyncOperation = 'upsert'
) {
  try {
    const collection = typesenseClient.collections<T>(collectionName);

    if (operation === 'delete') {
      await collection.documents(document.id).delete();
    } else {
      await collection.documents().upsert(document);
    }
  } catch (error) {
    console.error(
      `Failed to ${operation} document in ${collectionName}:`,
      error
    );
    throw error;
  }
}

export async function batchSyncDocuments<T extends Record<string, unknown>>(
  collectionName: string,
  documents: T[],
  action: 'create' | 'upsert' | 'update' = 'upsert'
) {
  if (documents.length === 0) return 0;

  const collection = typesenseClient.collections<T>(collectionName);
  const batchSize = 100;
  let total = 0;

  for (let i = 0; i < documents.length; i += batchSize) {
    const batch = documents.slice(i, i + batchSize);
    const results = await collection.documents().import(batch, { action });

    total += results.filter((r) => r.success).length;
    const errors = results.filter((r) => !r.success);
    if (errors.length > 0) {
      console.error(`Batch sync errors:`, errors);
    }
  }

  console.log(`✓ Synced ${documents.length} documents to ${collectionName}`);

  return total;
}
