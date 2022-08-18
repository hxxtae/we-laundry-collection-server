import { getCollections, removeCollection } from '../db/database.js';

export async function getAll() {  
  return getCollections()
    .toArray()
    .then(mapCollections);
}

export async function getFindOne(collectionName) {
  const name = collectionName ? collectionName : '';
  return getCollections({ name })
    .toArray()
    .then(mapCollections);
}

export async function removeOne(collectionName) {
  const name = collectionName ? collectionName : '';
  return removeCollection(name);
}

export async function removeMany(collectionNames) {
  const names = collectionNames.length ? collectionNames : [];
  const asyncResult = names.map(async (name) => removeCollection(name));
  const result = await Promise.all(asyncResult);
  return result;
}

function mapOptional(collection) {
  return collection && {
    name: collection.name,
    type: collection.type
  };
}

function mapCollections(collections) {
  return collections
    .map(mapOptional)
    .sort((a, b) => {
      const [frontA, backA] = a.name.split('_');
      const [frontB, backB] = b.name.split('_');
      if (frontA > frontB) return 1;
      if (frontA < frontB) return -1;
      if (frontA === frontB) {
        if (backA > backB) return 1;
        if (backA < backB) return -1;
        return 0;
      }
    });
}
