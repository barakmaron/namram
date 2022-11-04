import express from "express";
import SaleRouter from './Sale/Sale.js';
import ProductsRouter from './Products/ProductsRoute.js';

const routes = express.Router();

routes.use('/sale', SaleRouter);
routes.use('/products', ProductsRouter);

export default routes;