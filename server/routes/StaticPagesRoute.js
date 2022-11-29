import express from "express";
import AuthenticateToken from "../middleware/AuthMiddleware.js";
import { validate } from "../middleware/ValidationErrorMiddleware.js";
import { checkSchema } from 'express-validator';
import StaticPagesSchemas from "../validationSchemas/StaticPagesSchemas.js";
import StaticPageController from "../controllers/StaticPageController.js";

const router = express.Router();

router.get('/',  StaticPageController.GetStaticPages);

router.post('/', 
    AuthenticateToken, 
    validate(checkSchema(StaticPagesSchemas.AddStaticPage)),
    StaticPageController.AddStaticPage);

router.delete('/:id', 
    AuthenticateToken, 
    validate(checkSchema(StaticPagesSchemas.DeleteStaticPage)),
    StaticPageController.DeleteStaticPage);
    
export default router;