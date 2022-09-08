import MongoDB from 'mongodb';

import { getUsersCollection } from '../db/database.js';

/**
 * Get User All
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

/**
 * Find User By username
 * @param {string} username - username
 * @returns {Promise<{} | {
 *  _id: MongoDB.ObjectId,
 *  username: string,
 *  password: string,
 *  tel: string,
 *  id: string
 * }>} user data
 */
export async function findUserByName(username) {
  return getUsersCollection()
    .findOne({ username })
    .then(mapOptionalUser);
}

/**
 * Remove User
 * @param {string} id - user object id
 * @returns {Promise<boolean>} delete success state
 */
export async function removeUser(id) {
  return getUsersCollection()
    .deleteOne({ _id: new MongoDB.ObjectId(id) })
    .then(deleteOptional);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : {};
}

function mapUser(users) {
  return users.map(mapOptionalUser);
}

/**
 * deleteOne result
 * @param {{acknowledged: boolean, deletedCount: number}} result - deleteOne result
 * @returns {boolean} delete success state
 */
function deleteOptional(result) {
  return result ? result.acknowledged : false;
}