import express from 'express';
import CustomersController from '../controllers/CustomersController.js';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import CustomersSchemas from '../validationSchemas/CustomersSchemas.js';

const router = express.Router();

router.get('/', CustomersController.GetAllCustomers);

router.patch('/:id', 
    validate(checkSchema(CustomersSchemas.PatchCustomer)),
    CustomersController.PatchCustomer);

router.delete('/:id', 
    validate(checkSchema(CustomersSchemas.DeleteCustomer)),
    CustomersController.DeleteCustomer);

export default router;