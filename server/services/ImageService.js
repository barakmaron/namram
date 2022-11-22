import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function ResizeAndStoreImage(path, filename){
    try {
        const ref = `${filename}.webp`;
        await sharp(path).webp({ quality: 70 }).toFile(`./Images/${ref}`);
        DeleteStoredImages(filename);
        return ref;
    } catch (err) {
        throw err;
    }
}

async function DeleteStoredImages(filename) {
    try {
       return await fs.unlinkSync(path.join(__dirname, `../Images/${filename}`));
    } catch (err) {
        throw err;
    }
}

 const ImageService = {
    ResizeAndStoreImage,
    DeleteStoredImages
 };

 export default ImageService;