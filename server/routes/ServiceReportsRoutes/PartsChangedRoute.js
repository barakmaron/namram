import express from 'express';
import ServiceReportsController from '../../controllers/ServiceReports/ServiceReportsController.js';

const router = express.Router({ mergeParams: true });

router.post('/', ServiceReportsController.parts_changed.AddChangedPart);
router.delete('/:part_id', ServiceReportsController.parts_changed.DeleteChangedPart);

export default router;