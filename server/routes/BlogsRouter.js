import express from 'express';
import BlogsController from '../controllers/BlogsController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';
import UploadMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/', BlogsController.GetAllBlogs);
router.post('/', AuthenticateToken, UploadMiddleware.single('Image'), BlogsController.AddBlog);
router.patch('/:id', AuthenticateToken, BlogsController.PatchBlog);
router.delete('/:id', AuthenticateToken, BlogsController.DeleteBlog);

export default router;
