import { deleteAllCollections } from '~/lib/typesense/collections';

async function deleteCollections() {
  await deleteAllCollections();
}

deleteCollections().then((result) => {
  console.log(result);
});
