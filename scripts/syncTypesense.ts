import { initializeAllCollections } from '~/lib/typesense/collections';

async function syncTypesense() {
  await initializeAllCollections();
}

syncTypesense().then((result) => {
  console.log(result);
});
