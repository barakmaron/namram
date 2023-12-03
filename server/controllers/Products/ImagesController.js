import ProductsService from "../../services/Products/index.js";
import { StatusCode } from 'status-code-enum';

async function DeleteImage(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.Images.DeleteImage(id);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function AddImages(req, res, next) {
    try {
        const { product_id, filesNames } = req.body;
        const images_db = await ProductsService.Images.AddImages(product_id, filesNames);
        return res.status(StatusCode.SuccessOK).json(images_db);
    } catch (err) {
        next(err);
    }
}

const ImagesController = {
    DeleteImage,
    AddImages
};

export default ImagesController;