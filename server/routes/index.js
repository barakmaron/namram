import express from "express";
import SaleRouter from './Sale.js';
import RentRouter from './Rent.js';
import ProductsRouter from './Products/ProductsRoute.js';
import ImagesRouter from './ImagesRoute.js';
import RentalAgreementsRouter from './RentalAgreementsRoute.js';
import CustomersRouter from './CustomersRouter.js';
import ServiceReportsRouter from './ServiceReportsRoutes/ServiceReportsRoute.js';

const routes = express.Router();

routes.use('/sale', SaleRouter);
routes.use('/rent', RentRouter);
routes.use('/products', ProductsRouter);
routes.use('/images', ImagesRouter);
routes.use('/rental_agreements', RentalAgreementsRouter);
routes.use('/customers', CustomersRouter);
routes.use('/service_reports', ServiceReportsRouter);

export default routes;