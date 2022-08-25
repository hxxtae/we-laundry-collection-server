import * as UsersRepository from '../data/users.js';

export async function userAll(req, res, next) {
  const users = await UsersRepository.getUsers();
  res.status(200).json(users);
}
