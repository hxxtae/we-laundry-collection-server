import { getManagerCollection } from '../db/database.js';

export async function getManager(admin_id) {
  return getManagerCollection()
    .findOne({ admin_id })
    .then(mapOptionalManager);
}

function mapOptionalManager(manager) {
  return manager && { ...manager, id: manager._id.toString() };
}

function mapManager(managers) {
  return managers.map(mapOptionalManager);
}