import express from 'express';
import CategoryController from '../controllers/CategoriesController.js';
import AuthenticateToken from '../middleware/AuthMiddleware.js';
import UploadImageMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/:id', CategoryController.GetCategory);
router.post('/', AuthenticateToken, UploadImageMiddleware.single('image'), CategoryController.AddCategory);
router.delete('/:id', AuthenticateToken, CategoryController.DeleteCategory);
router.patch('/:id', AuthenticateToken, CategoryController.EditCategory);

export default router;