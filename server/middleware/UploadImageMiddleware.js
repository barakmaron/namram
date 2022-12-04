import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ErrorMessages from '../validationSchemas/ErrorMessages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadMiddleware = multer({
    dest: path.join(__dirname, "..//Images")
});
export function makeMulterUploadMiddleware(multerUploadFunction) {
    return (req, res, next) =>
        multerUploadFunction(req, res, err => {
            if (err && err.name && err.name === 'MulterError') {
                return res.status(500).json({
                    errors: [{
                        msg: ErrorMessages.file,
                        param: 'Image'
                    }]
                });
            } else if(!req.file && !req.files.length) {
                return res.status(400).json({
                    errors: [{
                        msg: ErrorMessages.file,
                        param: 'Image'
                    }]
                })
            }
            next();
        });
    }


export default UploadMiddleware;
