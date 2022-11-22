import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UploadMiddleware = multer({
    dest: path.join(__dirname, "..//Images"),
    onError : function(err, next) {
        console.log('error', err);
        next(err);
      }
});

export default UploadMiddleware;