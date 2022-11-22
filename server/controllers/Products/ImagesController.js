import ProductsService from "../../services/Products/index.js";
import ImageService from '../../services/ImageService.js';

async function DeleteImage(req, res) {
    try {
        const { id } = req.params;
        await ProductsService.Images.DeleteImage(id);
        return res.status(200).json();
    } catch (err) {

    }
}

async function AddImages(req, res) {
    try {
        const { product_id } = req.body;
        const files = req.files.map((file) => ({
            path: file.path, 
            filename: file.filename 
        }));   
        const images_db = await ProductsService.Images.AddImages(product_id, files);
        return res.status(200).json(images_db);
    } catch (err) {
        console.log(err);
    }
}

const ImagesController = {
    DeleteImage,
    AddImages
};

export default ImagesController;