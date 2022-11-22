import express from 'express';
import ProductsController from '../../controllers/Products/index.js';

const router = express.Router();

router.patch('/:id', ProductsController.Props.PatchProps);
router.post('/', ProductsController.Props.AddProp);
router.delete('/:id', ProductsController.Props.DeleteProp);

export default router;