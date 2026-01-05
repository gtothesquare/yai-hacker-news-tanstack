import { typesenseClient } from './client';
import { SchemaKey, schemas } from './schemas';
import { Errors } from 'typesense';
import {
  CollectionDropFieldSchema,
  CollectionFieldSchema,
} from 'typesense/lib/Typesense/Collection';

export async function ensureCollection(schemaKey: SchemaKey) {
  const schema = schemas[schemaKey];

  try {
    await typesenseClient.collections(schema.name).retrieve();
    console.log(`✓ Collection '${schema.name}' exists`);
  } catch (err: unknown) {
    const error = err as Errors.TypesenseError;
    if (error.httpStatus === 404) {
      await typesenseClient.collections().create(schema);
      console.log(`✓ Created collection '${schema.name}'`);
    } else {
      console.error(`✗ Error with collection '${schema.name}':`, error);
      throw error;
    }
  }
}

export async function initializeAllCollections() {
  const schemaKeys = Object.keys(schemas) as Array<SchemaKey>;

  for (const key of schemaKeys) {
    await ensureCollection(key);
  }
}

export async function deleteCollection(schemaKey: SchemaKey) {
  await typesenseClient.collections(schemaKey).delete();
}

export async function updateCollectionFields(
  schemaKey: SchemaKey,
  fields: (CollectionFieldSchema | CollectionDropFieldSchema)[]
) {
  await typesenseClient.collections(schemaKey).update({ fields });
}

export async function deleteAllCollections() {
  const schemaKeys = Object.keys(schemas) as Array<SchemaKey>;

  for (const key of schemaKeys) {
    await deleteCollection(key);
  }
}
