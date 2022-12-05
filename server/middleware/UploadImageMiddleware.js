import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ErrorMessages from '../validationSchemas/ErrorMessages.js';
import { StatusCode } from 'status-code-enum';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadMiddleware = multer({
    dest: path.join(__dirname, "..//Images")
});
export function makeMulterUploadMiddleware(multerUploadFunction, error_filed = "Image") {
    return (req, res, next) =>
        multerUploadFunction(req, res, err => {
            if (err && err.name && err.name === 'MulterError') {
                return res.status(StatusCode.ServerErrorInternal).json({
                    errors: [{
                        msg: ErrorMessages.file[error_filed],
                        param: error_filed
                    }]
                });
            } else if(!req.file && !req.files?.length) {
                return res.status(StatusCode.ClientErrorBadRequest).json({
                    errors: [{
                        msg: ErrorMessages.file[error_filed],
                        param: error_filed
                    }]
                })
            }
            next();
        });
    }


export default UploadMiddleware;
