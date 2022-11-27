import express from 'express';
import ProjectsController from '../../controllers/Projects/ProjectsController.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';
import ProjectsImagesRouter from './ProjectsImagesRouter.js';

const router = express.Router();

router.get('/', ProjectsController.GetAllProjects);
router.post('/', UploadMiddleware.array('Image'), ProjectsController.AddProject);
router.delete('/:id', ProjectsController.DeleteProject);
router.patch('/:id', ProjectsController.PatchProject);
router.use('/:id/images', ProjectsImagesRouter);

export default router;