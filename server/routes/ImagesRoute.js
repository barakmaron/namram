import express from 'express';
import ImagesController from '../controllers/ImagesController.js';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import GetImageSchema from '../validationSchemas/ImagesSchemas.js';

const router = express.Router();

router.get('/:file_name', 
    validate(checkSchema(GetImageSchema)),
    ImagesController.GetImage);

export default router;