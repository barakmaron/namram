import express from 'express';
import ServiceReportsController from '../../controllers/ServiceReports/ServiceReportsController.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import PartsChangedRouter from './PartsChangedRoute.js';
import { checkSchema } from 'express-validator';
import ServiceReportsSchemas from '../../validationSchemas/ServiceReportsSchemas/ServiceReportsSchemas.js';

const router = express.Router();

router.use('/:id/part_changed', PartsChangedRouter);

router.get('/product/:id', 
    validate(checkSchema(ServiceReportsSchemas.GetServiceReport)), 
    ServiceReportsController.GetServiceBook);

router.get('/:id', 
    validate(checkSchema(ServiceReportsSchemas.GetServiceReport)),  
    ServiceReportsController.GetServiceReport);

router.get('/', ServiceReportsController.GetServiceReports);

router.post('/', 
    validate(checkSchema(ServiceReportsSchemas.AddServiceReport)), 
    ServiceReportsController.AddServiceReport);

router.patch('/:id', 
    validate(checkSchema(ServiceReportsSchemas.PatchServiceReport)), 
    ServiceReportsController.PatchServiceReport);


export default router;