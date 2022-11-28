import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductsSparePartsSchemas from '../../validationSchemas/ProductsSchemas/ProductsSparePartsSchemas.js';

const router = express.Router();

router.post('/', 
    validate(checkSchema(ProductsSparePartsSchemas.AddPart)), 
    ProductsController.SpareParts.AddPart);

router.delete('/:id', 
    validate(checkSchema(ProductsSparePartsSchemas.DeletePart)), 
    ProductsController.SpareParts.DeletePart);
    
router.patch('/:id',
    validate(checkSchema(ProductsSparePartsSchemas.PatchPart)),  
    ProductsController.SpareParts.PatchPart);

export default router;