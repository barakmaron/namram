import SaleService from "../../services/SaleService/index.js";
import Categories from './CategoriesController.js';
import Products from './ProductsController.js';

async function GetAllWithNested(req, res) {
    try {
        const categories = await SaleService.GetAllWithNested();
        return res.status(200).json(categories);
    } catch (err) {
        throw err;
    }
}

const SaleController = {
    GetAllWithNested,
    Categories,
    Products
};

export default SaleController;