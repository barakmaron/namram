import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.post('/login', AuthController.Login);
router.get('/logout', AuthenticateToken, AuthController.Logout);
router.get('/token', AuthenticateToken, AuthController.CheckToken);

export default router;