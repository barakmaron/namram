import express from 'express';
import PropsRouter from './ProductsPropsRoute.js';
import ImagesRouter from './ProductsImagesRoute.js';
import ProductsController from '../../controllers/Products/index.js';
import DiagramRouter from './ProductsDiagramRouter.js';
import SparePartsRouter from './ProductsSparePartsRouter.js';
import UploadImageMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.post('/', UploadImageMiddleware.array('product_images', 10), ProductsController.AddProduct);
router.delete('/:id', ProductsController.DeleteSaleProduct);
router.patch('/:id', ProductsController.PatchProduct);

router.use('/props', PropsRouter);
router.use('/images', ImagesRouter);
router.use('/diagrams', DiagramRouter);
router.use('/spare_parts', SparePartsRouter);


export default router;