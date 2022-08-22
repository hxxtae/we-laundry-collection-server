import express from 'express';
import 'express-async-errors';

import * as authController from '../controller/auth.js';

const router = express.Router();

router.post('/login', authController.managerConfirm);
router.post('/logout', authController.managerDisConnect);

export default router;

