import { ProductsImagesModel } from "../../../db/models/index.js";

async function DeleteImage(id) {
    return await ProductsImagesModel.destroy({
        where: {
            id: id
        }
    });
}

async function AddImages(product_id, images) {
    const products_images = images.map((image) => ProductsImagesModel.create({
        Image: image,
        ProductId: product_id
    }));
    return await Promise.all(products_images);
}

async function GetImageById(id) {
    return await ProductsImagesModel.findOne({
        where: {
            id: id
        }
    });
}

const ImagesDB = {
    DeleteImage,
    AddImages,
    GetImageById
};

export default ImagesDB;