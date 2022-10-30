import express from "express";
import SaleRouter from './Sale.js';

const routes = express.Router();

routes.use('/sale', SaleRouter);

export default routes;