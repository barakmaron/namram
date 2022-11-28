import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductsPropsSchemas from '../../validationSchemas/ProductsSchemas/ProductsPropsSchemas.js';

const router = express.Router();

router.patch('/:id', 
    validate(checkSchema(ProductsPropsSchemas.AddProp)),
    ProductsController.Props.PatchProps);

router.post('/', 
    validate(checkSchema(ProductsPropsSchemas.AddProp)),
    ProductsController.Props.AddProp);

router.delete('/:id', 
    validate(checkSchema(ProductsPropsSchemas.AddProp)),
    ProductsController.Props.DeleteProp);

export default router;