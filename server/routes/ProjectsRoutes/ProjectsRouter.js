import express from 'express';
import ProjectsController from '../../controllers/Projects/ProjectsController.js';
import AuthenticateToken from '../../middleware/AuthMiddleware.js';
import UploadMiddleware, { makeMulterUploadMiddleware } from '../../middleware/UploadImageMiddleware.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import ProjectsImagesRouter from './ProjectsImagesRouter.js';
import { checkSchema } from 'express-validator';
import ProjectsSchemas from '../../validationSchemas/ProjectsSchemas/ProjectsSchemas.js';

const router = express.Router();

router.get('/', ProjectsController.GetAllProjects);

router.post('/', 
    AuthenticateToken, 
    makeMulterUploadMiddleware(UploadMiddleware.array('Image')),
    validate(checkSchema(ProjectsSchemas.AddProject)), 
    ProjectsController.AddProject);

router.delete('/:id', 
    AuthenticateToken, 
    validate(checkSchema(ProjectsSchemas.DeleteProject)), 
    ProjectsController.DeleteProject);

router.patch('/:id', 
    AuthenticateToken, 
    validate(checkSchema(ProjectsSchemas.PatchProject)), 
    ProjectsController.PatchProject);

router.use('/:id/images', AuthenticateToken, ProjectsImagesRouter);

export default router;