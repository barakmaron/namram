import Props from "./PropsController.js";
import Images from './ImagesController.js';
import ProductsService from "../../services/Products/index.js";
import Diagrams from './DiagramsController.js';
import SpareParts from './SparePartsController.js';

async function AddProduct(req, res) {
    try {
        const { category_id, Name, SerialNumber, Text, Price, ...props } = req.body;
        const files = req.files.map((file) => ({
            path: file.path, 
            filename: file.filename 
        }));  
        const product = await ProductsService.AddProduct(category_id, Name, SerialNumber, Text, Price, files, props, req.baseUrl);
        return res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
}

async function DeleteSaleProduct(req, res) {
    try {
        const { id } = req.params;
        await ProductsService.DeleteProduct(id, req.baseUrl);
        return res.status(200).json();
    } catch (err) {
        console.log(err)
    }
}

async function PatchProduct(req, res) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await ProductsService.PatchProduct(id, param_name, value, req.baseUrl);
        return res.status(200).json();
    } catch (err) {
        
    }
}

const ProductsController = {
    AddProduct,
    DeleteSaleProduct,
    PatchProduct,
    Props,
    Images,
    Diagrams,
    SpareParts
};

export default ProductsController;