import ProductsDB from "../storage/Products/index.js";
import ImageService from '../ImageService.js';

async function DeleteImage(id) {
    const image = await ProductsDB.Images.GetImageById(id);
    const delete_image = ImageService.DeleteStoredImages(image.Image);
    return [await Promise.all([ProductsDB.Images.DeleteImage(id), delete_image])];
}

async function AddImages(product_id, files) {         
    return await ProductsDB.Images.AddImages(product_id, files);
}

const ImagesService = {
    DeleteImage,
    AddImages
};

export default ImagesService;