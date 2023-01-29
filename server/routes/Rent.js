import express from 'express';
import RentController from '../controllers/RentController.js';
import CategoriesRouter from './CategoriesRoute.js';
import ProductsRouter from './Products/ProductsRoute.js';

const router = express.Router();

router.get('/', RentController.GetAllWithNested);
router.use('/categories', CategoriesRouter);
router.use('/products', ProductsRouter);

export default router;