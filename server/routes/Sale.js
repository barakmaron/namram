import express from 'express';
import SaleController from '../controllers/SaleController.js';

const router = express.Router();

router.get('/', SaleController.GetCategories);

export default router;