import express from 'express';
import SaleController from '../../controllers/Sale/index.js';
import SaleCategoriesRouter from './CategoriesRoute.js';
import SaleProductsRouter from './ProductsRoute.js';

const router = express.Router();

router.get('/', SaleController.GetAllWithNested);
router.use('/categories', SaleCategoriesRouter);
router.use('/products', SaleProductsRouter);

export default router;