import SaleDB from "../storage/Sale/index.js";
import categories from './CategoriesService.js';
import products from './ProductsService.js';

async function GetAllWithNested() {
    return SaleDB.GetAllWithNested();
}

const SaleService = {
    GetAllWithNested,
    categories,
    products
};

export default SaleService;