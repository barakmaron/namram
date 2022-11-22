import SaleService from "../services/SaleService.js";

async function GetAllWithNested(req, res) {
    try {
        const categories = await SaleService.GetAllWithNested();
        return res.status(200).json(categories);
    } catch (err) {
        throw err;
    }
}

const SaleController = {
    GetAllWithNested
};

export default SaleController;