import express from 'express';
import CategoryController from '../controllers/CategoriesController.js';
import UploadImageMiddleware from '../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.get('/:id', CategoryController.GetCategory);
router.post('/', UploadImageMiddleware.single('image'), CategoryController.AddCategory);
router.delete('/:id', CategoryController.DeleteCategory);
router.patch('/:id', CategoryController.EditCategory);

export default router;