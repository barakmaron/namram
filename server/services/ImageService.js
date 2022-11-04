import sharp from 'sharp';

async function ResizeAndStoreImage(path, filename){
    try {
        const ref = `${filename}.webp`;
        await sharp(path).webp({ quality: 70 }).toFile(`./Images/${ref}`);
        return ref;
    } catch (err) {
        throw err;
    }
}

 const ImageService = {
    ResizeAndStoreImage
 };

 export default ImageService;