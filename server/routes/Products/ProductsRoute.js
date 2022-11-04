import express from 'express';
import PropsRouter from './ProductsPropsRoute.js';

const router = express.Router();

router.use('/props', PropsRouter);

export default router;