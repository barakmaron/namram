import express from 'express';
import ProductsController from '../../controllers/Products/index.js';
import UploadMiddleware from '../../middleware/UploadImageMiddleware.js';
import { validate } from '../../middleware/ValidationErrorMiddleware.js';
import { checkSchema } from 'express-validator';
import ProductsDiagramSchemas from '../../validationSchemas/ProductsSchemas/ProductsDiagramSchemas.js';

const router = express.Router();

router.post('/',
    UploadMiddleware,
    validate(checkSchema(ProductsDiagramSchemas.AddDiagram)),
    ProductsController.Diagrams.AddDiagram);

router.post('/:id',
    validate(checkSchema(ProductsDiagramSchemas.AddDiagramFromList)),
    ProductsController.Diagrams.AddDiagramFromList);

router.delete('/:diagram_id/:product_id',
    validate(checkSchema(ProductsDiagramSchemas.DeleteDiagramFromProduct)),
    ProductsController.Diagrams.DeleteDiagramFromProduct);

router.delete('/:id',
    validate(checkSchema(ProductsDiagramSchemas.DeleteDiagram)),
    ProductsController.Diagrams.DeleteDiagram);

router.patch('/:id',
    validate(checkSchema(ProductsDiagramSchemas.PatchDiagram)),
    ProductsController.Diagrams.PatchDiagram);

router.get('/',
    ProductsController.Diagrams.GetDiagrams);

export default router;