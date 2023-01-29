import SaleService from "../services/SaleService.js";
import { StatusCode } from 'status-code-enum';

async function GetAllWithNested(req, res, next) {
    try {
        const categories = await SaleService.GetAllWithNested();
        return res.status(StatusCode.SuccessOK).json(categories);
    } catch (err) {
        next(err);
    }
}

const SaleController = {
    GetAllWithNested
};

export default SaleController;