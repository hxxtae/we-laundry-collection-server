import * as UsersRepository from '../data/users.js';

export async function userAll(req, res, next) {
  const users = await UsersRepository.getUsers();
  res.status(200).json(users);
}

export async function userRemove(req, res, next) {
  const { username } = req.params;
  
  if (!username || username === ':username') {
    return res.status(404).json({ message: 'username is undefined' });
  }

  const user = await UsersRepository.findUserByName(username);
  const empty = (Object.keys(user).length === 0) && (user.constructor === Object);
  if (empty) {
    return res.status(404).json({ message: 'User is not found' });
  }
  
  const id = user.id;
  const result = await UsersRepository.removeUser(id);
  if (!result) {
    return res.status(406).json({ message: 'User delete failed' });
  }
  res.status(200).json(result); // result: boolean;
}
