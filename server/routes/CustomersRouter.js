import express from 'express';
import CustomersController from '../controllers/CustomersController.js';

const router = express.Router();

router.get('/', CustomersController.GetAllCustomers);
router.patch('/:id', CustomersController.PatchCustomer);
router.delete('/:id', CustomersController.DeleteCustomer);

export default router;