import express from 'express';
import BlogsController from '../controllers/BlogsController.js';
import UploadMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/', BlogsController.GetAllBlogs);
router.post('/', UploadMiddleware.single('Image'), BlogsController.AddBlog);
router.patch('/:id', BlogsController.PatchBlog);
router.delete('/:id', BlogsController.DeleteBlog);

export default router;
