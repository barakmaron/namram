import express from 'express';
import SaleController from '../../controllers/Sale/index.js';
import SaleCategoriesRouter from './Categories.js';

const router = express.Router();

router.get('/', SaleController.GetAllWithNested);
router.use('/categories', SaleCategoriesRouter);

export default router;