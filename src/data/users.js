import { getUsersCollection } from '../db/database.js';

/**
 * Find User All
 * @returns {Promise<[] | {
 *  _id: MongoDB.ObjectId,
 *  username: string,
 *  password: string,
 *  tel: string,
 *  id: string
 * }[]>} users array data
 */
export async function getUsers() {
  return getUsersCollection()
    .find()
    .toArray()
    .then(mapUser);
}

function mapOptionalUser(user) {
  return user && { ...user, id: user._id.toString() };
}

function mapUser(users) {
  return users.map(mapOptionalUser);
}
