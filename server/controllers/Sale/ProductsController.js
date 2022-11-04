import SaleService from "../../services/SaleService/index.js";
import ImageService from '../../services/ImageService.js';

async function AddProduct(req, res) {
    try {
        const { category_id, name, serial_number, text, price, ...props } = req.body;
        const files = req.files.map((file) => ({
            path: file.path, 
            filename:file.filename 
        }));        
        const image_resized = files.map(file => ImageService.ResizeAndStoreImage(file.path, file.filename));
        const images = await Promise.all(image_resized);
        const product = await SaleService.products.AddProduct(category_id, name, serial_number, text, price, images, props)
        return res.status(200).json(product);
    } catch (err) {
        console.log(err)
    }
}

async function DeleteProduct(req, res) {
    try {
        const { id } = req.params;
        await SaleService.products.DeleteProduct(id);
        return res.status(200).json();
    } catch (err) {

    }
}

async function PatchProduct(req, res) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await SaleService.products.PatchProduct(id, param_name, value);
        return res.status(200).json();
    } catch (err) {
        console.log(err);
    }
}

const ProductsController = {
    AddProduct,
    DeleteProduct,
    PatchProduct
};

export default ProductsController;