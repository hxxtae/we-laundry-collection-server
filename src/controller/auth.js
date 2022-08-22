import bcrypt from 'bcrypt';
import { config } from '../config.js';
import jwt from 'jsonwebtoken';

import { getManager } from '../data/auth.js';


export async function managerConfirm(req, res, next) {
  const { admin_id, admin_pw } = req.body;
  if (admin_id === undefined || admin_pw === undefined) {
    return res.status(401).json({ message: "유효하지 않은 계정입니다." });
  }

  const manager = await getManager(admin_id);
  if (manager == undefined) {
    return res.status(401).json({ message: "유효하지 않은 계정입니다." });
  }

  //const hash = await bcrypt.hash(admin_pw, config.bcrypt.saltRounds);
  const isValidPassword = await bcrypt.compare(admin_pw, manager.admin_pw);
  if (!isValidPassword) {
    return res.status(401).json({ message: "유효하지 않은 계정입니다." });
  }

  const token = createJwtToken(manager.id);
  setToken(res, token);
  res.status(200).json({ token, admin_id });
}

export async function managerDisConnect(req, res, next) {
  setToken(res, '');
  res.status(200).json({ message: 'Manager has been logged out' });
}

function createJwtToken(id) {
  return jwt.sign(
    {
      id,
    },
    config.jwt.secretKey,
    {
      expiresIn: config.jwt.expiresInSec
    }
  );
};

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  };
  res.cookie('m_token', token, options);
}
