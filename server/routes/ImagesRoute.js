import express from 'express';
import ImagesController from '../controllers/ImagesController.js';

const router = express.Router();

router.get('/:file_name', ImagesController.GetImage);

export default router;