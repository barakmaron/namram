import express from 'express';
import BlogsController from '../controllers/BlogsController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';
import UploadMiddleware, { makeMulterUploadMiddleware } from '../middleware/UploadImageMiddleware.js';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import BlogsSchemas from '../validationSchemas/BlogsSchemas.js';

const router = express.Router();

router.get('/', BlogsController.GetAllBlogs);

router.post('/', 
    AuthenticateToken, 
    makeMulterUploadMiddleware(UploadMiddleware.single('Image')), 
    validate(checkSchema(BlogsSchemas.AddBlog)),
    BlogsController.AddBlog);

router.patch('/:id', 
    AuthenticateToken,
    validate(checkSchema(BlogsSchemas.PatchBlog)),
    BlogsController.PatchBlog);

router.delete('/:id', 
    AuthenticateToken,
    validate(checkSchema(BlogsSchemas.DeleteBlog)),
    BlogsController.DeleteBlog);

export default router;
