import MongoDB from 'mongodb';
import { getManagerCollection } from '../db/database.js';

/**
 * Find Manager By account id
 * @param {string} admin_id - manager id
 * @returns {Promise<{} | { 
 *  _id: MongoDB.ObjectId,
 *  admin_id: string, 
 *  admin_pw: string, 
 *  id: string 
 * }>} manager object data
 */
export async function getManager(admin_id) {
  return getManagerCollection()
    .findOne({ admin_id })
    .then(mapOptionalManager);
}

/**
 * Find Manager By ObjectId
 * @param {string} id - manager objectId
 * @returns {Promise<{} | { 
 *  _id: MongoDB.ObjectId,
 *  admin_id: string, 
 *  admin_pw: string, 
 *  id: string 
 * }>} manager object data
 */
export async function getManagerById(id) {
  return getManagerCollection()
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalManager);
}

function mapOptionalManager(manager) {
  return manager ? { ...manager, id: manager._id.toString() } : {};
}

function mapManager(managers) {
  return managers.map(mapOptionalManager);
}
