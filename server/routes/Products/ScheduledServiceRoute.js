import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import { checkSchema } from 'express-validator';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import ProductsScheduledServiceSchema from '../../validationSchemas/ProductsSchemas/ProductsScheduledServiceSchema.js';

const router = express.Router();

router.post('/', 
    validate(checkSchema(ProductsScheduledServiceSchema.AddScheduledService)),
    ProductsController.ScheduledService.AddService);

router.delete('/:id', 
    validate(checkSchema(ProductsScheduledServiceSchema.DeleteScheduledService)),
    ProductsController.ScheduledService.DeleteService);
    
router.patch('/:id', 
    validate(checkSchema(ProductsScheduledServiceSchema.PatchScheduledService)),
    ProductsController.ScheduledService.PatchService);

export default router;