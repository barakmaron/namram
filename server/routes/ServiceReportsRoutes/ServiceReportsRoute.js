import express from 'express';
import ServiceReportsController from '../../controllers/ServiceReports/ServiceReportsController.js';
import PartsChangedRouter from './PartsChangedRoute.js';

const router = express.Router();

router.use('/:id/part_changed', PartsChangedRouter);
router.get('/product/:id', ServiceReportsController.GetServiceBook);
router.get('/:id', ServiceReportsController.GetServiceReport);
router.get('/', ServiceReportsController.GetServiceReports);
router.post('/', ServiceReportsController.AddServiceReport);
router.patch('/:id', ServiceReportsController.PatchServiceReport);


export default router;