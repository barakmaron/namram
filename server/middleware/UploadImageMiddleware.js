import path from 'path';
import { fileURLToPath } from 'url';
import ErrorMessages from '../validationSchemas/ErrorMessages.js';
import { StatusCode } from 'status-code-enum';
import ImageService from '../services/ImageService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadMiddleware = async (req, res, next) => {
    const { filesNames } = req.body;
    if (filesNames) {
        const parsedFilesNames = filesNames.split(',');
        const imageResized = parsedFilesNames.map((fileName, index) => {
            if(!fileName.endsWith('.pdf'))
                ImageService.ResizeAndStoreImage(fileName, req.body[`file${index}`]);
            // TODO: Add pdf support 
                
        });
        const images = await Promise.all(imageResized);
        parsedFilesNames.map((fileName, index) => delete req.body[`file${index}`]);
        req.body.filesNames = images;
    } else {
        return res.status(StatusCode.ServerErrorInternal).json({
            errors: [{
                msg: ErrorMessages.file["Image"],
                param: "Image"
            }]
        });
    }
    next();
}

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
            } else if (!req.file && !req.files?.length) {
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
