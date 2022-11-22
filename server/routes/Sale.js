import express from 'express';
import SaleController from '../controllers/SaleController.js';
import CategoriesRouter from './CategoriesRoute.js';
import ProductsRouter from './Products/ProductsRoute.js';

const router = express.Router();

router.get('/', SaleController.GetAllWithNested);
router.use('/categories', CategoriesRouter);
router.use('/products', ProductsRouter);

export default router;