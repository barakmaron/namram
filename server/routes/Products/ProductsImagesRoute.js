import express from 'express';
import ProductController from '../../controllers/Products/index.js';
import UploadMiddleware, { makeMulterUploadMiddleware } from '../../middleware/UploadImageMiddleware.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductsImagesSchemas from '../../validationSchemas/ProductsSchemas/ProductsImagesSchemas.js';

const router = express.Router();

router.delete('/:id', 
    validate(checkSchema(ProductsImagesSchemas.DeleteImage)),
    ProductController.Images.DeleteImage);

router.post('/', 
    makeMulterUploadMiddleware(UploadMiddleware.array('Image', 10)), 
    validate(checkSchema(ProductsImagesSchemas.AddImages)),
    ProductController.Images.AddImages);

export default router;