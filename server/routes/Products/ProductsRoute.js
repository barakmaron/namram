import express from 'express';
import PropsRouter from './ProductsPropsRoute.js';
import ImagesRouter from './ProductsImagesRoute.js';
import ProductsController from '../../controllers/Products/index.js';
import DiagramRouter from './ProductsDiagramRouter.js';
import SparePartsRouter from './ProductsSparePartsRouter.js';
import UploadImageMiddleware, { makeMulterUploadMiddleware } from '../../middleware/UploadImageMiddleware.js';
import AuthenticateToken from '../../middleware/AuthMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductSchemas from '../../validationSchemas/ProductsSchemas/ProductSchemas.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';

const router = express.Router();

router.get('/:id', ProductsController.GetProduct);

router.post('/', 
    AuthenticateToken, 
    makeMulterUploadMiddleware(UploadImageMiddleware.array('Image', 20)), 
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


export default router;