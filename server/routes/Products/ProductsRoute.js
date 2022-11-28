import express from 'express';
import PropsRouter from './ProductsPropsRoute.js';
import ImagesRouter from './ProductsImagesRoute.js';
import ProductsController from '../../controllers/Products/index.js';
import DiagramRouter from './ProductsDiagramRouter.js';
import SparePartsRouter from './ProductsSparePartsRouter.js';
import UploadImageMiddleware from '../../middleware/UploadImageMiddleware.js';
import AuthenticateToken from '../../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/:id', ProductsController.GetProduct);

router.post('/', AuthenticateToken, UploadImageMiddleware.array('product_images', 10), ProductsController.AddProduct);
router.delete('/:id', AuthenticateToken, ProductsController.DeleteSaleProduct);
router.patch('/:id', AuthenticateToken, ProductsController.PatchProduct);

router.use('/props', AuthenticateToken, PropsRouter);
router.use('/images', AuthenticateToken, ImagesRouter);
router.use('/diagrams', AuthenticateToken, DiagramRouter);
router.use('/spare_parts', AuthenticateToken, SparePartsRouter);


export default router;