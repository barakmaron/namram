import express from 'express';
import RentalAgreementsController from '../controllers/RentalAgreementsController.js';
import UploadMiddleware, { makeMulterUploadMiddleware } from '../middleware/UploadImageMiddleware.js';
import { checkSchema } from 'express-validator';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import RentalAgreementsSchemas from '../validationSchemas/RentalAgreementsSchemas.js';

const router = express.Router();

router.get('/:id',
    validate(checkSchema(RentalAgreementsSchemas.GetRentalAgreement)), 
    RentalAgreementsController.GetRentalAgreement);

router.get('/', 
    RentalAgreementsController.GetAgreements);

router.post('/customer/:id',
    UploadMiddleware,
    validate(checkSchema(RentalAgreementsSchemas.AddRentalAgreement)),  
    RentalAgreementsController.AddAgreement);

router.post('/:id',
    UploadMiddleware,
    validate(checkSchema(RentalAgreementsSchemas.CloseRentalAgreement)),  
    RentalAgreementsController.CloseAgreement);

router.post('/', 
    UploadMiddleware,
    validate(checkSchema(RentalAgreementsSchemas.AddRentalAgreement)), 
    RentalAgreementsController.AddAgreement);

router.delete('/:id',
    validate(checkSchema(RentalAgreementsSchemas.DeleteRentalAgreement)),  
    RentalAgreementsController.DeleteAgreement);

export default router;