import express from 'express';
import ContactController from '../controllers/ContactController.js';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ContactSchema from '../validationSchemas/ContactSchema.js';

const router = express.Router();

router.post('/', 
    validate(checkSchema(ContactSchema)),
    ContactController.SendForm);

export default router;