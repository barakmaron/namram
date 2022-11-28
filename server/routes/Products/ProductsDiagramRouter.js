import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductsDiagramSchemas from '../../validationSchemas/ProductsSchemas/ProductsDiagramSchemas.js';

const router = express.Router();

router.post('/', 
    UploadMiddleware.single('image'), 
    validate(checkSchema(ProductsDiagramSchemas.AddDiagram)),
    ProductsController.Diagrams.AddDiagram);

router.delete('/:id', 
    validate(checkSchema(ProductsDiagramSchemas.DeleteDiagram)),
    ProductsController.Diagrams.DeleteDiagram);

router.patch('/:id', 
    validate(checkSchema(ProductsDiagramSchemas.PatchDiagram)),
    ProductsController.Diagrams.PatchDiagram);

export default router;