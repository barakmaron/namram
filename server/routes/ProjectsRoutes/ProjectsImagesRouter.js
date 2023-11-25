import express from 'express';
import ProjectsImagesController from '../../controllers/Projects/ProjectsImagesController.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProjectsImagesSchemas from '../../validationSchemas/ProjectsSchemas/ProjectsImagesSchemas.js';

const router = express.Router({ mergeParams: true });

router.post('/',
    UploadMiddleware,
    validate(checkSchema(ProjectsImagesSchemas.AddImages)),
    ProjectsImagesController.AddImages);

router.delete('/:image_id',
    validate(checkSchema(ProjectsImagesSchemas.DeleteImage)),
    ProjectsImagesController.DeleteImage);

export default router;