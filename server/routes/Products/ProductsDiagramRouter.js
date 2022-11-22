import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';

const router = express.Router();

router.post('/', UploadMiddleware.single('image'), ProductsController.Diagrams.AddDiagram);
router.delete('/:id', ProductsController.Diagrams.DeleteDiagram);
router.patch('/:id', ProductsController.Diagrams.PatchDiagram);

export default router;