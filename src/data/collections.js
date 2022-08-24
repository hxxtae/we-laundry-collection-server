import { getCollections, removeCollection } from '../db/database.js';

/**
 * Collection 전체 조회 Function
 * @returns { Promise<{name: string, type: string}[]> } collections object array
 */
export async function getAll() {  
  return getCollections()
    .toArray()
    .then(mapCollections);
}

/**
 * 특정 Collection 조회 Function
 * @param { string } collectionName - collection name
 * @returns { Promise<[] | {name: string, type: string}[]> } collection object array
 */
export async function getFindOne(collectionName) {
  const name = collectionName ? collectionName : '';
  return getCollections({ name })
    .toArray()
    .then(mapCollections);
}

/**
 * 특정 Collection 삭제 Function
 * @param { string } collectionName - collection name
 * @returns { Promise<boolean> } collection remove result boolean
 */
export async function removeOne(collectionName) {
  const name = collectionName ? collectionName : '';
  return removeCollection(name);
}

/**
 * 다수 Collection 삭제 Function
 * @param { string[] } collectionNames - collection name array
 * @returns { Promise<string[]> } collections remove result array
 */
export async function removeMany(collectionNames) {
  const names = collectionNames.length ? collectionNames : [];
  const asyncResult = names.map(async (name) => {
    removeCollection(name);
    return name;
  });
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
