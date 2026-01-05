import {
  deleteCollection,
  initializeAllCollections,
} from '~/lib/typesense/collections';
import { SchemaKey } from '~/lib/typesense/schemas';

async function temp() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('schema name missing');
    process.exit(1);
  }

  await deleteCollection(args[0] as SchemaKey);
  await initializeAllCollections();
}

temp().then(async (result) => {
  console.log(result);
});
