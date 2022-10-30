import SaleDB from "./storage/SaleDB.js";

async function GetCategories() {
    return SaleDB.GetCategoriesWithProducts();
}

const SaleService = {
    GetCategories
};

export default SaleService;