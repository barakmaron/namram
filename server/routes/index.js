import express from "express";
import SaleRouter from './Sale.js';
import RentRouter from './Rent.js';
import ProductsRouter from './Products/ProductsRoute.js';
import ImagesRouter from './ImagesRoute.js';
import RentalAgreementsRouter from './RentalAgreementsRoute.js';
import CustomersRouter from './CustomersRouter.js';
import ServiceReportsRouter from './ServiceReportsRoutes/ServiceReportsRoute.js';
import BlogsRouter from './BlogsRouter.js';
import ProjectsRouter from './ProjectsRoutes/ProjectsRouter.js';
import AuthRouter from './AuthRoute.js';
import StaticPagesRouter from './StaticPagesRoute.js';
import CategoriesRouter from './CategoriesRoute.js'
import ContactRoute from './ContactRoute.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';

const routes = express.Router();
routes.use('/categories', CategoriesRouter)
routes.use('/sale', SaleRouter);
routes.use('/rent', RentRouter);
routes.use('/products', ProductsRouter);
routes.use('/images', ImagesRouter);
routes.use('/rental_agreements', AuthenticateToken, RentalAgreementsRouter);
routes.use('/customers', AuthenticateToken, CustomersRouter);
routes.use('/service_reports', AuthenticateToken, ServiceReportsRouter);
routes.use('/blogs', BlogsRouter);
routes.use('/projects', ProjectsRouter);
routes.use('/auth', AuthRouter);
routes.use('/static_pages', StaticPagesRouter);
routes.use('/contact', ContactRoute);

export default routes;