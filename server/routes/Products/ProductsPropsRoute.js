import express from 'express';
import ProductsController from '../../controllers/Products/index.js';

const router = express.Router();

router.patch('/:id', ProductsController.Props.PatchProps);

export default router;