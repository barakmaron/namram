import express from 'express';
import RentalAgreementsController from '../controllers/RentalAgreementsController.js';
import UploadMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/:id', RentalAgreementsController.GetRentalAgreement);
router.get('/', RentalAgreementsController.GetAgreements);
router.post('/customer/:id', UploadMiddleware.single('Signature'), RentalAgreementsController.AddAgreement);
router.post('/:id', UploadMiddleware.single('Signature'), RentalAgreementsController.CloseAgreement)
router.post('/', UploadMiddleware.single('Signature'), RentalAgreementsController.AddAgreement);
router.delete('/:id', RentalAgreementsController.DeleteAgreement);

export default router;