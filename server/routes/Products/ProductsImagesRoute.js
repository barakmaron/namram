import express from 'express';
import ProductController from '../../controllers/Products/index.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.delete('/:id', ProductController.Images.DeleteImage);
router.post('/', UploadMiddleware.array('images', 10), ProductController.Images.AddImages);

export default router;