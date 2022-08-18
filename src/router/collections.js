import express from 'express';
import 'express-async-errors';

import * as collectionsController from '../controller/collections.js';

const router = express.Router();

router.get('/', collectionsController.collectionAll);
router.delete('/:name', collectionsController.collectionRemove);
router.delete('/', collectionsController.collectionRemoveMany);

export default router;