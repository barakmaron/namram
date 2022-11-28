import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';
import { checkSchema } from 'express-validator';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import AuthSchemas from '../validationSchemas/AuthSchemas.js';

const router = express.Router();

router.post('/login',
    validate(checkSchema(AuthSchemas.Login)),
    AuthController.Login);
router.get('/logout', AuthenticateToken, AuthController.Logout);
router.get('/token', AuthenticateToken, AuthController.CheckToken);

export default router;