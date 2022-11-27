import express from 'express';
import ProjectsImagesController from '../../controllers/Projects/ProjectsImagesController.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router({ mergeParams: true });

router.post('/', UploadMiddleware.array('images'), ProjectsImagesController.AddImages);
router.delete('/:image_id', ProjectsImagesController.DeleteImage);

export default router;