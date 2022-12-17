import express from 'express';
import BackupController from '../controllers/BackupController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.get('/database', AuthenticateToken, BackupController.GetDataBase);
// router.get('/rental_agreements', AuthenticateToken, BackupController.GetRentalAgreements);

export default router;