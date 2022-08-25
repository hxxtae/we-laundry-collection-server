import express from 'express';
import 'express-async-errors';

import * as usersController from '../controller/users.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuth, usersController.userAll);

export default router;
