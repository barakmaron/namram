import express from 'express';
import ProjectsController from '../../controllers/Projects/ProjectsController.js';
import AuthenticateToken from '../../middleware/AuthMiddleware.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';
import ProjectsImagesRouter from './ProjectsImagesRouter.js';

const router = express.Router();

router.get('/', ProjectsController.GetAllProjects);
router.post('/', AuthenticateToken, UploadMiddleware.array('Image'), ProjectsController.AddProject);
router.delete('/:id', AuthenticateToken, ProjectsController.DeleteProject);
router.patch('/:id', AuthenticateToken, ProjectsController.PatchProject);
router.use('/:id/images', AuthenticateToken, ProjectsImagesRouter);

export default router;