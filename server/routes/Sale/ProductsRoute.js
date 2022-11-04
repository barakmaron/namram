import express from 'express';
import SaleController from '../../controllers/Sale/index.js';
import UploadImageMiddleware from '../../middleware/UploadImageMiddleware.js';


const router = express.Router();

router.post('/', UploadImageMiddleware.array('product_images', 10), SaleController.Products.AddProduct);
router.delete('/:id', SaleController.Products.DeleteProduct);
router.patch('/:id', SaleController.Products.PatchProduct);

export default router;