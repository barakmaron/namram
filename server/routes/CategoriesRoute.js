import express from 'express';
import CategoryController from '../controllers/CategoriesController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';
import { validate } from '../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import CategoriesSchemas from '../validationSchemas/CategoriesSchemas.js';
import UploadMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/:id', CategoryController.GetCategory);

router.post('/', 
    AuthenticateToken, 
    UploadMiddleware,
    validate(checkSchema(CategoriesSchemas.AddCategory)),
    CategoryController.AddCategory);

router.delete('/:id', 
    AuthenticateToken, 
    validate(checkSchema(CategoriesSchemas.DeleteCategory)),
    CategoryController.DeleteCategory);

router.patch('/:id', 
    AuthenticateToken, 
    validate(checkSchema(CategoriesSchemas.PatchCategory)),
    CategoryController.EditCategory);

export default router;