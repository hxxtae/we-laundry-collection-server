import jwt from 'jsonwebtoken';

import { config } from '../config.js';
import * as AuthRepository from '../data/auth.js';

const AUTH_ERROR = { message: '관리자 외에는 처리할 수 없습니다.' };

export const isAuth = async (req, res, next) => {
  let token;

  // const authHeader = req.get('Authorization');
  // if (authHeader && authHeader.startsWith('Bearer ')) {
  //   token = authHeader.split(' ')[1];
  // }

  if (!token) {
    token = req.cookies['m_token'];
  }

  if (!token) {
    console.log('non-token 1');
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decode) => {
      if (error) {
        console.log('non-token 2');
        return res.status(401).json(AUTH_ERROR);
      }
      const manager = await AuthRepository.getManagerById(decode.id);
      const empty = (Object.keys(manager).length === 0) && (manager.constructor === Object);
      if (empty) {
        console.log('non-token 3');
        return res.status(401).json(AUTH_ERROR);
      }
      req.token = token;
      req.admin_id = manager.admin_id;
      next();
    }
  )
}
