import Props from "./PropsController.js";
import Images from './ImagesController.js';
import ProductsService from "../../services/Products/index.js";
import Diagrams from './DiagramsController.js';
import SpareParts from './SparePartsController.js';
import RentService from "../../services/RentService.js";
import PdfService from "../../services/PdfServices/index.js";

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

async function GetProduct(req, res) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        let product = await RentService.GetRentalProduct(id);
        product = pdf ? await RentService.CreateRentalProductReport(product.toJSON()) : product;
        if(pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(product);
        }
        return res.status(200).json(product);
    } catch (err) {
        console.log(err);
    }
}


const ProductsController = {
    AddProduct,
    DeleteSaleProduct,
    PatchProduct,
    GetProduct,
    Props,
    Images,
    Diagrams,
    SpareParts
};

export default ProductsController;