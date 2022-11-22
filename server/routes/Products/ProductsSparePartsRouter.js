import express from 'express';
import ProductsController from '../../controllers/Products/index.js';

const router = express.Router();

router.post('/', ProductsController.SpareParts.AddPart);
router.delete('/:id', ProductsController.SpareParts.DeletePart);
router.patch('/:id', ProductsController.SpareParts.PatchPart);

export default router;