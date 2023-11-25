import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function ResizeAndStoreImage(filename, base64Image, type) {
    try {
        if (type !== 'application/pdf') {
            const buffer = Buffer.from(base64Image, 'base64');
            const ref = `${uuid()}.webp`;
            await sharp(buffer).webp({ quality: 70 }).toFile(`./Images/${ref}`);
            // DeleteStoredImages(filename);
            return ref;
        }
        return filename;
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