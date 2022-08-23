import { config } from '../config.js';
import * as collectionsRepository from '../data/collections.js';

export async function collectionAll(req, res, next) {
  const result = await collectionsRepository.getAll();
  return res.status(200).json(result);
}

export async function collectionRemove(req, res, next) {
  const name = req.params.name;
  if (!name) {
    return res.status(404).json({ messege: `Collection name is undefined` });
  }

  const [t_users, t_manager] = [config.table.users, config.table.manager];
  if (name === t_users || name === t_manager) {
    return res.status(406).json({ message: `The Collection [${name}] cannot be deleted` });
  }

  const obj = await collectionsRepository.getFindOne(name);
  const found = Object.keys(obj).length;
  if (!found) {
    return res.status(404).json({ message: `Collection name (${name}) not found` });
  }

  const result = await collectionsRepository.removeOne(name); // result: boolean
  return res.status(204).json(result);
}

export async function collectionRemoveMany(req, res, next) {
  const { names } = req.body;

  if (!names.length) {
    return res.status(404).json({ message: `Collection names length 0` });
  }

  const result = await collectionsRepository.removeMany(names); // result: Array
  console.log(result);
  return res.status(204).json(result);
}
