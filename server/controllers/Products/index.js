import Props from "./PropsController.js";
import Images from './ImagesController.js';
import ScheduledService from './ScheduledServiceController.js';
import ProductsService from "../../services/Products/index.js";
import Diagrams from './DiagramsController.js';
import SpareParts from './SparePartsController.js';
import RentService from "../../services/RentService.js";
import { StatusCode } from 'status-code-enum';

async function AddProduct(req, res, next) {
    try {
        const { category_id, Name, SerialNumber, Text, Price, ...props } = req.body;
        const files = req.files.map((file) => ({
            path: file.path, 
            filename: file.filename 
        }));  
        const product = await ProductsService.AddProduct(category_id, Name, SerialNumber, Text, Price, files, props, req.baseUrl);
        return res.status(StatusCode.SuccessOK).json(product);
    } catch (err) {
        next(err);
    }
}

async function DeleteSaleProduct(req, res, next) {
    try {
        const { id } = req.params;
        await ProductsService.DeleteProduct(id, req.baseUrl);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function PatchProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { param_name, value } = req.body;
        await ProductsService.PatchProduct(id, param_name, value, req.baseUrl);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

async function GetProduct(req, res, next) {
    try {
        const { id } = req.params;
        const { pdf } = req.query;
        let product = await RentService.GetRentalProduct(id);
        product = pdf ? await RentService.CreateRentalProductReport(product.toJSON()) : product;
        if(pdf) {
            res.set('Content-Type', 'text/html');
            return res.send(product);
        }
        return res.status(StatusCode.SuccessOK).json(product);
    } catch (err) {
        next(err);
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
    SpareParts,
    ScheduledService
};

export default ProductsController;