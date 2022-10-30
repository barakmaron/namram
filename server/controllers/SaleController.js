import SaleService from "../services/SaleService.js";

async function GetCategories(req, res) {
    try {
        const categories = await SaleService.GetCategories();
        return res.status(200).json(categories);
    } catch (err) {
        throw err;
    }
}

const SaleController = {
    GetCategories
};

export default SaleController;