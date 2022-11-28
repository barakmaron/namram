import express from 'express';
import ServiceReportsController from '../../controllers/ServiceReports/ServiceReportsController.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ChangedPartSchema from '../../validationSchemas/ServiceReportsSchemas/PartsChangedSchemas.js';

const router = express.Router({ mergeParams: true });

router.post('/', 
    validate(checkSchema(ChangedPartSchema)), 
    ServiceReportsController.parts_changed.AddChangedPart);

router.delete('/:part_id',
    validate(checkSchema(ChangedPartSchema)), 
    ServiceReportsController.parts_changed.DeleteChangedPart);

export default router;