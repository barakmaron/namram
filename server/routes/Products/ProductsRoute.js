import express from 'express';
import PropsRouter from './ProductsPropsRoute.js';
import ImagesRouter from './ProductsImagesRoute.js';
import ProductsController from '../../controllers/Products/index.js';
import DiagramRouter from './ProductsDiagramRouter.js';
import SparePartsRouter from './ProductsSparePartsRouter.js';
import UploadImageMiddleware from '../../middleware/UploadImageMiddleware.js';
import AuthenticateToken from '../../middleware/AuthMiddleware.js';
import ScheduledServiceRouter from './ScheduledServiceRoute.js';
import { checkSchema } from 'express-validator';
import ProductSchemas from '../../validationSchemas/ProductsSchemas/ProductSchemas.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.post('/', 
    AuthenticateToken,
    UploadMiddleware,
    validate(checkSchema(ProductSchemas.AddProduct)), 
    ProductsController.AddProduct);

router.delete('/:id', 
    AuthenticateToken, 
    validate(checkSchema(ProductSchemas.DeleteProduct)), 
    ProductsController.DeleteSaleProduct);
    
router.patch('/:id', 
    AuthenticateToken, 
    validate(checkSchema(ProductSchemas.PatchProduct)), 
    ProductsController.PatchProduct);

router.use('/props', AuthenticateToken, PropsRouter);
router.use('/images', AuthenticateToken, ImagesRouter);
router.use('/diagrams', AuthenticateToken, DiagramRouter);
router.use('/spare_parts', AuthenticateToken, SparePartsRouter);
router.use('/scheduled_services', AuthenticateToken, ScheduledServiceRouter);

router.get('/:id', ProductsController.GetProduct);

export default router;