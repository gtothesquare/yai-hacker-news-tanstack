import { typesenseClient } from './client';
import { SchemaKey, schemas } from './schemas';
import { Errors } from 'typesense';

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
