import express from 'express';
import SaleController from '../../controllers/Sale/index.js';
import UploadImageMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.post('/', UploadImageMiddleware.single('image'), SaleController.Categories.AddCategory);
router.delete('/:id', SaleController.Categories.DeleteCategory);
router.put('/:id', UploadImageMiddleware.single('image'), SaleController.Categories.EditCategory);

export default router;