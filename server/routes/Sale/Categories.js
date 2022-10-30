import express from 'express';
import SaleController from '../../controllers/Sale/index.js';

const router = express.Router();

router.post('/', SaleController.Categories.AddCategory);

export default router;