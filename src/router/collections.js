import express from 'express';
import 'express-async-errors';

import * as collectionsController from '../controller/collections.js';
import { isAuth } from '../middleware/auth.js'

const router = express.Router();

router.get('/', isAuth, collectionsController.collectionAll);
router.delete('/:name', isAuth, collectionsController.collectionRemove);
router.delete('/', isAuth, collectionsController.collectionRemoveMany);

export default router;